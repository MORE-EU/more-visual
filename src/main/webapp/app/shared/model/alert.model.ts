export interface IAlerts {
  name: string;
  measure: string;
  values: { value1?: string; value2?: string };
  operation: string;
  duration: number;
  dateCreated: number;
  datasetId: string;
  active: boolean;
}

export const defaultValue: Readonly<IAlerts> = {
  name: '',
  measure: '',
  values: {},
  operation: '',
  duration: null,
  dateCreated: null,
  datasetId: null,
  active: true,
};
