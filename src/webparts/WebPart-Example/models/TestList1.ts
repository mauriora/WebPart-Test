import { Link, ListItem, ListItemBase, MetaTerm, UserLookup } from '@fusion5/controller-sharepoint-list';
import { Expose, Type } from 'class-transformer';
import { Test3 } from './Test3';

export class TestList1 extends ListItem {
    public constructor() {
        super();
    }

    @Expose({ name: 'CustomText'})
    public customText: string = undefined;

    @Expose({ name: 'MultilineText'})
    public multilineText: string = undefined;

    @Expose({ name: 'Money'})
    public money: number = undefined;

    @Expose({ name: 'IntegerNumber'})
    public integerNumber: number = undefined;

    @Expose({ name: 'FraactionNumber' })
    public fraactionNumber: number = undefined;

    @Expose({ name: 'ADateTime' })
    public aDateTime: string = undefined;

    @Expose({ name: 'ADate' })
    public aDate: string = undefined;

    @Expose({ name: 'AFlag'})
    public aFlag: boolean = undefined;

    @Type( () => UserLookup )
    @Expose({ name: 'SomeOne' })
    public someOne: UserLookup = undefined;

    @Type( () => UserLookup )
    @Expose({ name: 'SeveralPeople'})
    public severalPeople: Array<UserLookup> = new Array<UserLookup>();

    @Type( () => ListItemBase )
    @Expose({ name: 'SingleLookup' })
    public singleLookup: ListItemBase = undefined;

    @Type( () => ListItemBase )
    @Expose({ name: 'MultiLookUp' })
    public multiLookUp: Array<ListItemBase> = new Array<UserLookup>();
    
    @Expose({ name: 'SingleChoice' })
    public singleChoice: string = undefined;
    
    @Expose({ name: 'MultiChoice' })
    public multiChoice: Array<string> = new Array<string>();

    @Type( () => Link )
    @Expose({ name: 'ALink' })
    public aLink: Link = undefined;

    @Type( () => MetaTerm )
    @Expose({ name: 'MetaDepartment'})
    public metaDepartment: MetaTerm = undefined;

    @Type( () => MetaTerm )
    @Expose({ name: 'Departments'})
    public departments: Array<MetaTerm> = new Array<MetaTerm>();

    // @Type( () => MetaTerm )
    // @Expose({ name: 'DepartmentsPlus'})
    // public departmentsPlus: MetaTerm = undefined;

    // @Type( () => MetaTerm )
    // @Expose({ name: 'FreeDepartment'})
    // public freeDepartment: MetaTerm = undefined;

    @Expose({ name: 'ChoicePlus' })
    public choicePlus: string = undefined;

    @Expose({ name: 'ChoicesPlus' })
    public choicesPlus: Array<string> = new Array<string>();

    @Type( () => Link )
    @Expose({ name: 'APicture' })
    public aPicture: Link = undefined;

    @Type( () => Test3 )
    @Expose({ name: 'SingleExtendedLookup' })
    public singleExtendedLookup: Test3 = undefined;
}