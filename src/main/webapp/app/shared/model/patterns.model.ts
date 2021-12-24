import { IPatternGroup } from './pattern-group.model';

export interface IPatterns {
  frequency: number;
  length: number;
  knee: number[];
  annotation_vector: number[];
  corrected: {
    knee: { k: number; dimensions: string[] };
    annotationVector: { func: number };
  };
  patternGroups: IPatternGroup[];
}

export const defaultValue: Readonly<IPatterns> = {
  frequency: 0,
  length: 0,
  knee: [],
  annotation_vector: [],
  corrected: { knee: { k: 0, dimensions: [] }, annotationVector: { func: 0 } },
  patternGroups: [],
};
