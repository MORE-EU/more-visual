import { IPatternGroup } from './pattern-group.model';

export interface IPatterns {
  frequency: number;
  length: number;
  knee: number[];
  corrected: {
    knee: { k: number; dimensions: string[] };
    annotationVector: boolean;
  };
  patternGroups: IPatternGroup[];
}

export const defaultValue: Readonly<IPatterns> = {
  frequency: 0,
  length: 0,
  knee: [],
  corrected: { knee: { k: 0, dimensions: [] }, annotationVector: false },
  patternGroups: [],
};
