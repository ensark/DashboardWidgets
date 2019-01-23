export interface News {
  id: string;
  orgUnitId: number;
  title: string;
  imageId?: number;
  text: string;
  date: Date;
  fromDate?: Date;
  toDate?: Date;
  author: string;
  email: string;
}
