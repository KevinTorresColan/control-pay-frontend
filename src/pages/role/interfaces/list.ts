export interface IRole {
  id: number;
  name: string;
  state: string;
} 

export type IRoleFilter = Omit<IRole, 'id'>

export interface IRoleListResponse {
  data: IRole[];
  count: number;
  pageSize?: number;
  page?: number;
}

export type ISchemaList = 'name' | 'state';