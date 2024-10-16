export interface IUser {
  id: number;
  idDocumentsType: number;
  idRole: number;
  address: string;
  age: string;
  birthday: string;
  cellPhone: string;
  documentNumber: string;
  email: string;
  lastName: string;
  names: string;
  state: string;
} 

export type IUserFilter = {
  documentNumber: string;
  lastName: string;
  names: string;
  state: string;
}

export interface IUserListResponse {
  data: IUser[];
  count: number;
  pageSize?: number;
  page?: number;
}

export type ISchemaList = 'documentNumber' | 'lastName' | 'names' | 'state';