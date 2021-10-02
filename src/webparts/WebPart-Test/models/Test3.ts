import { ListItem } from '@mauriora/controller-sharepoint-list';
import { Expose } from 'class-transformer';

export class Test3 extends ListItem {
    public constructor() {
        super();
    }

    @Expose({ name: 'SomeText'})
    public someText: string = undefined;

    @Expose({ name: 'PositiveInteger'})
    public positiveInteger: number = undefined;
}