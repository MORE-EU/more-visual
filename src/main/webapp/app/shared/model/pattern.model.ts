import { ITimeRange } from 'app/shared/model/time-range.model';

export interface IPattern {
  id: number;
  range: ITimeRange;
}

export const defaultValue: Readonly<IPattern> = { id: null, range: null as ITimeRange };
