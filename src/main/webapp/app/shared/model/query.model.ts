import { ITimeRange } from './time-range.model';
import { IChangepointDate } from 'app/shared/model/changepoint-date.model';

export interface IQuery {
  range?: ITimeRange;
  frequency: string;
  measures?: number[];
  filter?: {};
  secondaryMeasures?: number[];
}

// export const defaultValue: Readonly<IQuery> = { range: { from: 1514939111400, to: 1514941728600 }, frequency: 'MINUTE' };
export const defaultValue: Readonly<IQuery> = { range: null, frequency: 'MINUTE' };
