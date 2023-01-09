export interface IAlerts {
  name: string;
  measure: string;
  values: { value1?: string; value2?: string };
  operation: string;
  duration: number;
  dateCreated: number;
  datasetId: string;
  color: string;
  severity: number;
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
  color: '#333333',
  severity: 1,
  active: true,
};
