export interface IDocumentType {
  id: number;
  name: string;
  state: string;
} 

export type IDocumentTypeFilter = Omit<IDocumentType, 'id'>

export interface IDocumentTypeListResponse {
  data: IDocumentType[];
  count: number;
  pageSize?: number;
  page?: number;
}

export type ISchemaList = 'name' | 'state';