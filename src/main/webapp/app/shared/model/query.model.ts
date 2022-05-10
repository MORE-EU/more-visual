import { ITimeRange } from './time-range.model';

export interface IQuery {
  range?: ITimeRange;
  frequency: string;
  measures?: number[];
}

export const defaultValue: Readonly<IQuery> = { frequency: 'SECOND' };
