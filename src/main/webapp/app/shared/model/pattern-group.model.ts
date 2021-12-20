import { IPattern } from './pattern.model';

export interface IPatternGroup {
  color: number;
  patterns: IPattern[];
}

export const defaultValue: Readonly<IPatternGroup> = { color: null, patterns: [] };
