export interface IDataset {
  id?: string;
  name?: string;
  timeCol?: number;
  measures?: number[];
  header?: string[];
}

export const defaultValue: Readonly<IDataset> = {};
