import { ITimeRange } from 'app/shared/model/time-range.model';

export interface IChangePointDate {
  range: ITimeRange;
  id: number;
}

export const defaultValue: Readonly<IChangePointDate> = { range: null, id: null };
