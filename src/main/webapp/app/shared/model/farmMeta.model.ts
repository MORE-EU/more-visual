import { IDataset } from './dataset.model';

export interface IFarmMeta {
  name?: string;
  type?: string;
  resType?: number;
  data?: IDataset[];
  latitude?: number | null;
  longitude?: number | null;
  isTimeSeries?: boolean;
}

export const defaultValue: Readonly<IFarmMeta> = {};
