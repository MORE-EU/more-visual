export interface IDataset {
  id?: string;
  name?: string;
  formalName?: string;
  farmName?: string;
  timeCol?: number;
  measures?: number[];
  header?: string[];
}

export const defaultValue: Readonly<IDataset> = {};
