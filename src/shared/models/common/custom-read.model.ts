import { ReadModel } from "./read.model";

export interface CustomReadModel extends ReadModel {
  createdByUserId?: string;
  createdDateTime?: Date;
  createdDateTimeDisplay?: string;
  createdByBrowserName?: string;
  createdByIP?: string;
  modifiedByUserId?: string;
  modifiedDateTime?: Date;
  modifiedDateTimeDisplay?: string;
  modifiedByBrowserName?: string;
  modifiedByIP?: string;
  createdByUserName?: string;
  modifiedByUserName?: string;
}
