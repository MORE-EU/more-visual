import { IPatternGroup } from './pattern-group.model';

export interface IPatterns {
  patternGroups: IPatternGroup[];
}

export const defaultValue: Readonly<IPatterns> = {
  patternGroups: [],
};
