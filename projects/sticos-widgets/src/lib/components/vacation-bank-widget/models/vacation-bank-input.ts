export interface IChart {
  series: IChartSerie[];
}

export interface IChartSerie {
  name: string;
  values: ChartValue[];
}

export class ChartValue {
  name: string;
  value: number;
}

export enum VacationBankType {
  Total = 1,
  Spent = 5,
  NotSpent = 10,
  Pending = 11,
}
