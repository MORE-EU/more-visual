export interface IDataset {
  id?: string;
  path?: string;
  type?: string;
  name?: string;
  hasHeader?: boolean;
  measures?: number[];
  timeCol?: number;
}

export const defaultValue: Readonly<IDataset> = {};
