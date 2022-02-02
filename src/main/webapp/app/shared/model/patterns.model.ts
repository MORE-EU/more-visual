import { IPatternGroup } from './pattern-group.model';

export interface IPatterns {
  frequency: number;
  length: number;
  knee: number[];
  annotationVector: number[];
  corrected: {
    knee: { k: number; dimensions: number[] };
    annotationVector: { func: number };
  };
  patternGroups: IPatternGroup[];
}

export const defaultValue: Readonly<IPatterns> = {
  frequency: 0,
  length: 0,
  knee: [],
  annotationVector: [],
  corrected: { knee: { k: 0, dimensions: [] }, annotationVector: { func: 0 } },
  patternGroups: [],
};
