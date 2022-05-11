import { ITimeRange } from './time-range.model';

export interface IQuery {
  range?: ITimeRange;
  frequency: string;
  measures?: number[];
}

export const defaultValue: Readonly<IQuery> = { range: { from: 1514941200000, to: 1514944800000 }, frequency: 'SECOND' };
