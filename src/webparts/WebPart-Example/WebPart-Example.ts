import 'reflect-metadata';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'WebPartExampleStrings';
import Example from './components/Example';
import * as Controller from '@mauriora/controller-sharepoint-list';
import { createPropertyPaneSitePicker, ISite } from '@mauriora/utils-spfx-controls-react';
import { IExampleProps } from './components/IExampleProps';
import { IListInfo } from '@pnp/sp/presets/all';
import { configure } from 'mobx';


/**
 * Mobx Configuration
 */
configure({
  enforceActions: "never"
});

export interface IWebPartExampleProps {
  defaultListId: string;
  isolatedListId: string;
  isolatedSiteURL: string;
}

export default class WebPartExample extends BaseClientSideWebPart<IWebPartExampleProps> {

  private localListOptions = new Array<IPropertyPaneDropdownOption>();
  private isolatedListOptions = new Array<IPropertyPaneDropdownOption>();

  protected onInit = async (): Promise<void> => {
    console.log(`${this.context.manifest.alias} [${this.context.manifest.id}] version=${this.context.manifest.version} onInit`, { context: this.context, properties: this.properties });
    await super.onInit();
    await Controller.init(this.context);
  }

  private addPropertyPaneOptions = (listInfos: Array<IListInfo>, array: Array<IPropertyPaneDropdownOption>) => array.push(...
    listInfos.map(listInfo => ({
      key: listInfo.Id,
      text: listInfo.Title
    }))
  )

  public render(): void {
    console.log(`${this.context.manifest.alias} [${this.context.manifest.id}] version=${this.context.manifest.version} render`, { context: this.context, properties: this.properties });
    const element: React.ReactElement<IExampleProps> = React.createElement(
      Example,
      {
        localSiteUrl: this.context.pageContext?.web?.absoluteUrl,
        localListId: this.properties.defaultListId,
        isolatedSiteUrl: this.properties.isolatedSiteURL,
        isolatedListId: this.properties.isolatedListId
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private localDropdownDisabled: boolean;
  private isolatedDropdownDisabled: boolean;

  private loadIsolatedLists = async () => {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'isolated lists');
    const listInfos = await Controller.getLists(this.properties.isolatedSiteURL);
    this.addPropertyPaneOptions(listInfos, this.isolatedListOptions);
    this.isolatedDropdownDisabled = false;
    this.context.propertyPane.refresh();
    this.context.statusRenderer.clearLoadingIndicator(this.domElement);
  }

  protected onPropertyPaneConfigurationStart = async (): Promise<void> => {
    console.log(`${this.context.manifest.alias} [${this.context.manifest.id}] version=${this.context.manifest.version} onPropertyConfigurationStart`, { context: this.context, properties: this.properties });

    this.localDropdownDisabled = this.localListOptions.length === 0;
    this.isolatedDropdownDisabled = this.isolatedListOptions.length === 0;

    if (this.localListOptions.length == 0) {
      this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'lists');

      const listInfos = await Controller.getLists(this.context.pageContext?.web?.absoluteUrl);
      this.addPropertyPaneOptions(listInfos, this.localListOptions);
      this.localDropdownDisabled = false;
      this.context.propertyPane.refresh();

      this.context.statusRenderer.clearLoadingIndicator(this.domElement);
    }

    if (this.properties.isolatedSiteURL && this.isolatedListOptions.length === 0) {
      await this.loadIsolatedLists();
    }
  }

  /**
    * @param propertyPath - JSON path of the property in the property bag.
    * In the case of custom field, if no target property is provided then a custom value is assigned,
    * which will be in the form of `__CustomField_<key provided when the custom field is created>`.
  */
  protected onPropertyPaneFieldChanged = (propertyPath: string, oldValue: any, newValue: any) => {
    console.log(`${this.context.manifest.alias} [${this.context.manifest.id}] version=${this.context.manifest.version} onPropertyPaneFieldChanged(${propertyPath}, ${oldValue}, ${newValue})`, { context: this.context, properties: this.properties });

    switch (propertyPath) {
      case "isolatedSiteURL":
        if (this.properties.isolatedSiteURL) {
          this.loadIsolatedLists();
        } else {
          this.isolatedListOptions.length = 0;
          this.isolatedDropdownDisabled = true;
          this.context.propertyPane.refresh();
        }
        break;
    }
  }

  protected onCustomPropertyPaneFieldChanged = (propertyPath: string, newValue: any, ...args) => {
    console.log(`${this.context.manifest.alias} [${this.context.manifest.id}] version=${this.context.manifest.version} onCustomPropertyPaneFieldChanged(${propertyPath}, ${newValue})`, { context: this.context, properties: { ...this.properties }, newValue });

    switch (propertyPath) {
      case "isolatedSiteURL":
        const oldValue = this.properties.isolatedSiteURL;
        const newSite: ISite = newValue[0];

        console.log(`${this.context.manifest.alias} [${this.context.manifest.id}] version=${this.context.manifest.version} onCustomPropertyPaneFieldChanged(${propertyPath}, ${newValue})`, { context: this.context, properties: { ...this.properties }, newValue, newSite });

        // store new value in web part properties
        this.properties.isolatedSiteURL = newSite.url;
        // refresh web part
        if (this.properties.isolatedSiteURL) {
          this.loadIsolatedLists();
        } else {
          this.isolatedListOptions.length = 0;
          this.properties.isolatedListId = undefined;
          this.isolatedDropdownDisabled = true;
          this.context.propertyPane.refresh();
        }


        this.render();

        break;
    }
    console.log(`${this.context.manifest.alias} [${this.context.manifest.id}] version=${this.context.manifest.version} onCustomPropertyPaneFieldChanged(${propertyPath}, ${newValue})`, { context: this.context, properties: { ...this.properties }, newValue });
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.DefaultGroupName,
              groupFields: [
                PropertyPaneDropdown("defaultListId", {
                  label: strings.ListIdFieldLabel,
                  options: this.localListOptions,
                  disabled: this.localDropdownDisabled
                }),
              ],
            },
            {
              groupName: strings.IsolatedGroupName,
              groupFields: [
                createPropertyPaneSitePicker(this.onCustomPropertyPaneFieldChanged, "isolatedSiteURL", {
                  label: strings.SiteURLFieldLabel,
                  multiSelect: false,
                  placeholder: this.properties.isolatedSiteURL ? Controller.getSiteSync(this.properties.isolatedSiteURL).info?.Title : undefined,
                  initialSites: this.properties.isolatedSiteURL ?
                    [{
                      title: Controller.getSiteSync(this.properties.isolatedSiteURL).info?.Title,
                      url: this.properties.isolatedSiteURL
                    }]
                    :
                    [

                    ],
                  context: this.context
                }),
                PropertyPaneDropdown("isolatedListId", {
                  label: strings.ListIdFieldLabel,
                  options: this.isolatedListOptions,
                  disabled: this.isolatedDropdownDisabled
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
