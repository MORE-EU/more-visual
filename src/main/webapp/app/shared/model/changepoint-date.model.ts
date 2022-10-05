import { ITimeRange } from 'app/shared/model/time-range.model';

export interface IChangepointDate {
  range: ITimeRange;
  custom?: Boolean;
  id: number;
}

export const defaultValue: Readonly<IChangepointDate> = { range: null, id: null, custom: false };
