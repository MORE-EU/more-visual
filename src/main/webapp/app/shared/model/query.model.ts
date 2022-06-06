import { ITimeRange } from './time-range.model';

export interface IQuery {
  range?: ITimeRange;
  frequency: string;
  measures?: number[];
}

// export const defaultValue: Readonly<IQuery> = { range: { from: 1358667575, to: 1388475575 }, frequency: 'SECOND' };
export const defaultValue: Readonly<IQuery> = { range: null, frequency: 'MINUTE' };
