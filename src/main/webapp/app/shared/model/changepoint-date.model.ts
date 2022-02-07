export interface IChangePointDate {
  start: Date;
  end: Date;
}

export const defaultValue: Readonly<IChangePointDate> = { start: null, end: null };
