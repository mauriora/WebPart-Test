import { Link, ListItem, UserLookup } from '@fusion5/controller-sharepoint-list';
import { Expose, Type } from 'class-transformer';

export class Announcement extends ListItem {
    public constructor() {
        super();
    }

    @Expose({ name: 'Urgent' })
    public urgent: boolean = undefined;

    @Expose({ name: 'Body'})
    public body: string = undefined;

    @Expose({ name: 'StartDate' })
    public startDate: string = undefined;

    @Expose({ name: 'Expires'})
    public expires: string = undefined;

    @Type( () => Link )
    @Expose({name: 'URL'})
    public url: Link = undefined;

    @Type( () => UserLookup )
    @Expose({name: 'ContentOwner'})
    public contentOwner: UserLookup = undefined;

    @Type( () => UserLookup )
    @Expose({name: 'Receivers'})
    public receivers: Array<UserLookup> = new Array<UserLookup>();
}
