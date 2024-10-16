export interface IBank {
  id: number;
  account: string;
  cci: string;
  name: string;
  state: string;
} 

export type IBankFilter = Omit<IBank, 'id' | 'account' | 'cci'>

export interface IBankListResponse {
  data: IBank[];
  count: number;
  pageSize?: number;
  page?: number;
}

export type ISchemaList = 'name' | 'state';