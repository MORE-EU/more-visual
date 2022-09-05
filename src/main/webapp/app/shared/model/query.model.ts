import { IFilter } from './filter-model';
import { ITimeRange } from './time-range.model';

export interface IQuery {
  range?: ITimeRange;
  frequency: string;
  measures?: number[];
  filter?: IFilter;
}

// export const defaultValue: Readonly<IQuery> = { range: { from: 1514939111400, to: 1514941728600 }, frequency: 'MINUTE' };
export const defaultValue: Readonly<IQuery> = { range: null, frequency: 'MINUTE' };
