export interface IDataset {
  id?: string;
  name?: string;
  formalName?: string;
  farmName?: string;
  timeCol?: number;
  measures?: number[];
  header?: string[];
  washes?: boolean;
}

export const defaultValue: Readonly<IDataset> = {};
