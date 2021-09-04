import * as React from 'react';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { create as createController, ListItem, ListItemConstructor, SharePointModel } from '@mauriora/controller-sharepoint-list';
import { Spinner, Stack } from '@fluentui/react';
import { ErrorBoundary, ItemForm, ItemsList, useAsyncError } from '@mauriora/utils-spfx-controls-react';
import * as strings from 'WebPartExampleStrings';

export interface ListAndFormProps<ItemClass extends ListItem = ListItem> {
    listId: string;
    siteUrl: string;
    dataClass: ListItemConstructor<ItemClass>;
}

export const ListAndForm: FunctionComponent<ListAndFormProps> = ({ listId, siteUrl, dataClass }) => {
    const [item, setItem] = useState<ListItem>();
    const [model, setModel] = useState<SharePointModel<ListItem>>(undefined);
    const throwError = useAsyncError();

    const getData = useCallback(
        async () => {
            if (listId && siteUrl) {
                try {
                    const newController = await createController(listId, siteUrl);
                    await newController.init();

                    const newModel = await newController.addModel(dataClass, '');
                    await newModel.loadAllRecords();

                    setModel(newModel);
                    setItem(newModel.newRecord);
                } catch (controllerError) {
                    throwError(controllerError);
                }
            }
        },
        [listId, siteUrl]
    );

    const onSelect = useCallback(
        (selectedItems: ListItem[]) => {
            const item2set = selectedItems.length ?
                model.records.find(prospect => prospect.id === selectedItems[0].id) :
                model.newRecord;
            setItem(item2set);
        },
        [model]
    );

    useEffect(() => { getData(); }, [listId, siteUrl]);

    return model === undefined ?
        <Spinner />
        :
        <Stack>
            <ItemsList model={model} onSelect={onSelect} />
            <Stack horizontal>
                <ErrorBoundary>
                    <ItemForm key={listId + '-form1'} model={model} item={item} cancelButtonText={strings.CancelButtonText} saveButtonText={strings.SaveButtonText} deleteButtonText={strings.DeleteButtonText} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <ItemForm key={listId + '-form2'} model={model} item={item} cancelButtonText={strings.CancelButtonText} saveButtonText={strings.SaveButtonText} deleteButtonText={strings.DeleteButtonText} />
                </ErrorBoundary>
            </Stack>
        </Stack>;
};