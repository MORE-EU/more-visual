import { IChangePointDate } from 'app/shared/model/changepoint-date.model';

export interface IDataset {
  id?: string;
  name?: string;
  formalName?: string;
  farmName?: string;
  timeCol?: number;
  measures?: number[];
  header?: string[];
  gtChangepoints?: IChangePointDate[];
}

export const defaultValue: Readonly<IDataset> = {};
