export interface IQueryResults {
  data?: string[];
  measureStats?: any;
}

export const defaultValue: Readonly<IQueryResults> = {data: []};
