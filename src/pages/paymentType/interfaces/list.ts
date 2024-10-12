export interface IPaymentType {
  id: number;
  name: string;
  state: string;
} 

export type IPaymentTypeFilter = Omit<IPaymentType, 'id'>

export interface IPaymentTypeListResponse {
  data: IPaymentType[];
  count: number;
  pageSize?: number;
  page?: number;
}

export type ISchemaList = 'name' | 'state';