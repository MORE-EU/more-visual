interface IDatasetTimeRange {
  from: number;
  to: number;
  fromDate: string;
  toDate: string;
  intervalString: string;
}

export interface IDataset {
  id?: string;
  path?: string;
  type?: string;
  name?: string;
  hasHeader?: boolean;
  measures?: number[];
  schema?: string;
  timeCol?: string;
  idCol ?: string;
  valueCol ?: string;
  isConfiged ?: boolean;
}

export const defaultValue: Readonly<IDataset> = {};
