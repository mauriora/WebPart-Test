import * as React from 'react';
import { FunctionComponent } from 'react';
import { IExampleProps } from './IExampleProps';
import { Stack } from '@fluentui/react';
import { ErrorBoundary } from '@mauriora/utils-spfx-controls-react';
import { TestList1 } from '../models/TestList1';
import { Announcement } from '../models/Announcement';
import { ListAndForm } from './ListAndForm';


const ExampleContainer: FunctionComponent<IExampleProps> = ({ localListId, localSiteUrl, isolatedListId, isolatedSiteUrl }) => {
    return <Stack>
        <ErrorBoundary>
            <ListAndForm
                key={'ListAndForm-local'}
                dataClass={TestList1}
                siteUrl={localSiteUrl}
                listId={localListId}
            />
        </ErrorBoundary>
        <ErrorBoundary>
            <ListAndForm
                key={'ListAndForm-isolated'}
                dataClass={Announcement}
                siteUrl={isolatedSiteUrl}
                listId={isolatedListId}
            />
        </ErrorBoundary>
    </Stack>;
};

export default ExampleContainer;