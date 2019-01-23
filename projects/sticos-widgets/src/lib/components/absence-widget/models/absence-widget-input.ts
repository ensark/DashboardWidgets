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

export enum AbsenceType {
  Avspassering = 1,
  Sykmelding = 2,
  Permisjon = 3,
  Egenmelding = 4,
}
