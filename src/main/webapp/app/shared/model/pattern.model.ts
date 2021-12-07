export interface IPattern {
  start: Date;
  end: Date;
}

export const defaultValue: Readonly<IPattern> = { start: null, end: null };
