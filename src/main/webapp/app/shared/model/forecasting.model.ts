// Features Interfaces
/*  *************  */
export interface IForecastingForm {
  startDate: number | null;
  endDate: number | null;
  targetColumn: string[] | null;
  cleanData: boolean;
  dataSplit: number[];
  features: IFeatures;
  predictions: number;
  algorithms: IAlgorigths;
}

interface IFeatures {
  columnFeatures: IColumnFeatures[];
  optionalFeatures: IOptionalFeatures | null;
}

interface IColumnFeatures {
  columnName: string;
  features: string[];
}

interface IOptionalFeatures {
  temporal?: string[];
  pastMetrics?: { prevHour?: string[]; prevDay?: string[]; prevWeek?: string[]; prevMonth?: string[] };
  derivatives?: string[];
}
/*  *************  */

//Algorithms Interfaces
/*  *************  */
interface IXGBoost {
  booster: 'gbtree' | 'gblinear' | 'dart';
  learning_rate: [number, number, number] | number;
  max_depth: [number, number, number] | number;
  min_child_weight: [number, number, number] | number;
  gamma: [number, number, number] | number;
  lambda: [number, number, number] | number;
  alpha: [number, number, number] | number;
  colsample_bytree: [number, number, number] | number;
  n_estimators: [number, number, number] | number;
}

interface ILGBM {
  boosting_type: 'gbdt' | 'dart' | 'goss';
  learning_rate: [number, number, number] | number;
  max_depth: [number, number, number] | number;
  num_leaves: [number, number, number] | number;
  min_child_weight: [number, number, number] | number;
  reg_alpha: [number, number, number] | number;
  reg_lambda: [number, number, number] | number;
  colsample_bytree: [number, number, number] | number;
  n_estimators: [number, number, number] | number;
}

interface ILinearRegression {
  fit_intercept: boolean;
  positive: boolean;
}

interface IAlgorigths {
  XGBoost?: IXGBoost;
  LGBM?: ILGBM;
  LinearRegression?: ILinearRegression;
}
/*  *************  */

//Export Defaults
/*  *************  */
export const IForecastingDefault: Readonly<IForecastingForm> = {
  startDate: null,
  endDate: null,
  targetColumn: null,
  cleanData: true,
  algorithms: {},
  dataSplit: [60, 20, 20],
  features: { columnFeatures: [], optionalFeatures: {} },
  predictions: 0,
};

export const IXGBoostDefault: Readonly<IXGBoost> = {
  booster: 'gbtree',
  learning_rate: 0.1,
  max_depth: 6,
  min_child_weight: 1,
  gamma: 0,
  lambda: 1,
  alpha: 0,
  colsample_bytree: 1,
  n_estimators: 100,
};

export const ILGBMDefault: Readonly<ILGBM> = {
  boosting_type: 'gbdt',
  learning_rate: 0.1,
  max_depth: -1,
  num_leaves: 31,
  min_child_weight: 0.001,
  reg_alpha: 0,
  reg_lambda: 0,
  colsample_bytree: 1,
  n_estimators: 100,
};

export const ILinearRegressionDefault: Readonly<ILinearRegression> = {
  fit_intercept: true,
  positive: false,
};

export const IXGBoostIntervals = {
  learning_rate: { min: 0, max: 1 },
  max_depth: { min: 0, max: null }, //>0
  min_child_weight: { min: 0, max: null }, //>0
  gamma: { min: 0, max: null }, //>=0
  lambda: { min: 0, max: null }, //>=0
  alpha: { min: 0, max: null }, //>=0
  colsample_bytree: { min: 0, max: 1 },
  n_estimators: { min: 0, max: 1 }, //>0
};

export const ILGBMIntervals = {
  learning_rate: { min: 0, max: 1 },
  max_depth: { min: 1, max: null }, //>=1
  num_leaves: { min: 2, max: null }, //>=2
  min_child_weight: { min: 0, max: null }, //>0
  reg_alpha: { min: 0, max: 1 }, //>=0
  reg_lambda: { min: 0, max: 1 }, //>=0
  colsample_bytree: { min: 0, max: 1 },
  n_estimators: { min: 0, max: 1 }, //>0
};
/*  *************  */
