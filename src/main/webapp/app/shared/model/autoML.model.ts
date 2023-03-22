interface IFeatures {
  temporal?: string[];
  pastMetrics?: { prevHour?: string[]; prevDay?: string[]; prevWeek?: string[]; prevMonth: string[] };
  derivatives?: string[];
}

export interface IAutoMLForm {
  startDate: number | null;
  endDate: number | null;
  TargetColumn: string | null;
  cleanData: boolean;
  dataSplit: number[];
  features: IFeatures;
  predictions: number;
}

export const IAutoMLFormDefault: Readonly<IAutoMLForm> = {
  startDate: null,
  endDate: null,
  TargetColumn: null,
  cleanData: false,
  dataSplit: [80, 10, 10],
  features: {},
  predictions: 0,
};
