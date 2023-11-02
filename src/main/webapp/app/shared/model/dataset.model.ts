interface IDatasetTimeRange {
  from: number;
  to: number;
  fromDate: string;
  toDate: string;
  intervalString: string;
}

export interface IDataset {
  config?: string | null;
  fileInfoList?: string[];
  header?: string[];
  id?: string | null;
  idCol?: string | null;
  measures?: number[];
  path?: string | null;
  resType?: string | null;
  samplingInterval?: string | null;
  schema?: string | null;
  table?: string | null;
  timeCol?: string | null;
  timeFormat?: string | null;
  timeRange?: IDatasetTimeRange;
  type?: string;
  valueCol?: string;
}

export const defaultValue: Readonly<IDataset> = {};
