import { IDataPoint } from './data-point.model';

export interface IQueryResults {
  data?: IDataPoint[];
  measureStats?: any;
}

export const defaultValue: Readonly<IQueryResults> = {data: []};
