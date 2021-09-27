import { Link, ListItem, ListItemBase, MetaTerm, UserLookup } from '@mauriora/controller-sharepoint-list';
import { Expose, Type } from 'class-transformer';
import { Test3 } from './Test3';

export class TestList1 extends ListItem {
    public constructor() {
        super();
    }

    @Expose({ name: 'CustomText'})
    public customText: string;

    @Expose({ name: 'MultilineText'})
    public multilineText: string;

    @Expose({ name: 'Money'})
    public money: number;

    @Expose({ name: 'IntegerNumber'})
    public integerNumber: number;

    @Expose({ name: 'FraactionNumber' })
    public fractionNumber: number;

    @Expose({ name: 'ADateTime' })
    public aDateTime: string;

    @Expose({ name: 'ADate' })
    public aDate: string;

    @Expose({ name: 'AFlag'})
    public aFlag: boolean;

    @Type( () => UserLookup )
    @Expose({ name: 'SomeOne' })
    public someOne: UserLookup;

    @Type( () => UserLookup )
    @Expose({ name: 'SeveralPeople'})
    public severalPeople: Array<UserLookup> = new Array<UserLookup>();

    @Type( () => ListItemBase )
    @Expose({ name: 'SingleLookup' })
    public singleLookup: ListItemBase;

    @Type( () => ListItemBase )
    @Expose({ name: 'MultiLookUp' })
    public multiLookUp: Array<ListItemBase> = new Array<ListItemBase>();
    
    @Expose({ name: 'SingleChoice' })
    public singleChoice: string;
    
    @Expose({ name: 'MultiChoice' })
    public multiChoice: Array<string> = new Array<string>();

    @Type( () => Link )
    @Expose({ name: 'ALink' })
    public aLink: Link;

    @Type( () => MetaTerm )
    @Expose({ name: 'MetaDepartment'})
    public metaDepartment: MetaTerm;

    @Type( () => MetaTerm )
    @Expose({ name: 'Departments'})
    public departments: Array<MetaTerm> = new Array<MetaTerm>();

    @Expose({ name: 'ChoicePlus' })
    public choicePlus: string;

    @Expose({ name: 'ChoicesPlus' })
    public choicesPlus: Array<string> = new Array<string>();

    @Type( () => Link )
    @Expose({ name: 'APicture' })
    public aPicture: Link;

    @Type( () => Test3 )
    @Expose({ name: 'SingleExtendedLookup' })
    public singleExtendedLookup: Test3;
}