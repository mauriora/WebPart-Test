declare interface IWebPartExampleStrings {
  PleaseConfigureWebPart: string;
  PropertyPaneDescription: string;
  DefaultGroupName: string;
  IsolatedGroupName: string;

  NewFormHeading: string;
  AgendaHeading: string;
  BriefAwarenessHeading: string;
  DeliverySuccessHeading: string;
  ListIdFieldLabel: string;
  SiteURLFieldLabel: string;
  YesText: string;
  NoText: string;

  ErrorCreateLocal: string;
  ErrorCreateRemote: string;

  SaveButtonText: string;
  CancelButtonText: string;
  DeleteButtonText: string;
}

declare module 'WebPartExampleStrings' {
  const strings: IWebPartExampleStrings;
  export = strings;
}
