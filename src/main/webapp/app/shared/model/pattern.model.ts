import { ITimeRange } from 'app/shared/model/time-range.model';

export interface IPattern {
  id: number;
  datasetId: string;
  measure: number;
  range: ITimeRange;
}

export const defaultValue: Readonly<IPattern> = { id: null, datasetId: null, measure: null, range: null as ITimeRange };
