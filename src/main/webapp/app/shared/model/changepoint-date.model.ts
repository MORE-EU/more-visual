export interface IChangePointDate {
  start: Date;
  end: Date;
  id: number;
}

export const defaultValue: Readonly<IChangePointDate> = { start: null, end: null, id: null };
