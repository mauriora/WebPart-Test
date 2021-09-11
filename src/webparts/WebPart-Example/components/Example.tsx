import * as React from 'react';
import { IExampleProps } from './IExampleProps';
import ExampleContainer from './ExampleContainer';
import * as strings from 'WebPartExampleStrings';
import { Label } from '@fluentui/react';

export default class Example extends React.Component<IExampleProps, unknown> {
  public render(): React.ReactElement<IExampleProps> {
    const configured = (this.props.isolatedListId) && (this.props.isolatedSiteUrl)
      && (this.props.localListId) && (this.props.localSiteUrl);

      console.log(`Example.render() configured=${configured}`, { props: this.props });

    if (configured) {
      return (
          <ExampleContainer 
            localSiteUrl={this.props.localSiteUrl}
            localListId={this.props.localListId}
            isolatedSiteUrl={this.props.isolatedSiteUrl}
            isolatedListId={this.props.isolatedListId}
          />
      );
    } else {
      return (
        <Label>{strings.PleaseConfigureWebPart}</Label>
      );
    }
  }
}
