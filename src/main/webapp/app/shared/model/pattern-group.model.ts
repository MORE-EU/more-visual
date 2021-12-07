import { IPattern } from './pattern.model';

export interface IPatternGroup {
  frequency: number;
  length: number;
  color: number;
  patterns: IPattern[];
}

export const defaultValue: Readonly<IPatternGroup> = { frequency: 0, length: 0, color: null, patterns: [] };
