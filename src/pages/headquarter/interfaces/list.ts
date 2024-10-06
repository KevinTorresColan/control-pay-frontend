export interface IHeadquarter {
  id: number;
  name: string;
  address: string;
  state: string;
} 

export type IHeadquarterFilter = Omit<IHeadquarter, 'id'>

export interface IHeadquarterListResponse {
  data: IHeadquarter[];
  count: number;
  pageSize?: number;
  page?: number;
}

export type ISchemaList = 'name' | 'state';