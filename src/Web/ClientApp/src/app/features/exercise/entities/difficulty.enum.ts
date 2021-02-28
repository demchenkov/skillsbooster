import { KeyValue } from "@angular/common";

export enum Difficulty {
  Easy,
  Normal,
  Hard,
  Extreme
}

export const DifficultyDictionary: KeyValue<number, string>[] =
  Object.entries(Difficulty)
    .map<[number, string]>(([key, val]) => ([Number.parseInt(key, 10), val.toString()]))
    .filter(([key]) => Number.isInteger(key))
    .map(([key, value]) => ({key, value}));
