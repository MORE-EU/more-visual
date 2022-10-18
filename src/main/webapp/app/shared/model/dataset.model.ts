export interface IDataset {
  id?: string;
  name?: string;
  resType?: number;
  formalName?: string;
  farmName?: string;
  timeCol?: number;
  measures?: number[];
  header?: string[];
  washes?: boolean;
}

export const defaultValue: Readonly<IDataset> = {};
