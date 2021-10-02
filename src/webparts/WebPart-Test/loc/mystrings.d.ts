declare interface IWebPartTestStrings {
  PleaseConfigureWebPart: string;
  PropertyPaneDescription: string;
  DefaultGroupName: string;
  IsolatedGroupName: string;

  ListIdFieldLabel: string;
  SiteURLFieldLabel: string;

  SaveButtonText: string;
  CancelButtonText: string;
  DeleteButtonText: string;
}

declare module 'WebPartTestStrings' {
  const strings: IWebPartTestStrings;
  export = strings;
}
