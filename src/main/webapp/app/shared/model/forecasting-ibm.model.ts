// Features Interfaces
/*  *************  */
export interface IForecastingFormIbm {
  startDate: number | null;
  endDate: number | null;
  time_interval: string;
  targetColumn: string[] | null;
  experiment: 'WIND_POWER_ESTIMATION' | 'YAW_MISALIGNMENT' | 'SOILING_DETECTION' | null;
}

export const IForecastingIbmDefault: Readonly<IForecastingFormIbm> = {
  startDate: null,
  endDate: null,
  time_interval: '2S',
  targetColumn: null,
  experiment: 'WIND_POWER_ESTIMATION',
};
