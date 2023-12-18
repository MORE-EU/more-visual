import { IPattern } from './pattern.model';

export interface IPatternGroup {
  color: number;
  id: number;
  searchPattern: IPattern;
  similarPatterns: IPattern[];
}

export const defaultValue: Readonly<IPatternGroup> = { id: null, color: null, searchPattern: null, similarPatterns: [] };
