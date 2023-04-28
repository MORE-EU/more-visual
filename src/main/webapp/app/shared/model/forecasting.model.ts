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

export interface IForecastingForm {
  startDate: number | null;
  endDate: number | null;
  TargetColumn: string[] | null;
  cleanData: boolean;
  dataSplit: number[];
  features: IFeatures;
  predictions: number;
}

export const IForecastingDefault: Readonly<IForecastingForm> = {
  startDate: null,
  endDate: null,
  TargetColumn: null,
  cleanData: true,
  dataSplit: [60, 20, 20],
  features: { columnFeatures: [], optionalFeatures: {} },
  predictions: 0,
};
