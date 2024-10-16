export interface IStudent {
  id: number;
  idDocumentsType: number;
  idHeadquarter: number;
  names: string;
  lastName: string;
  age: string;
  birthday: string;
  address: string;
  tutorNames: string, 
  tutorLastName: string, 
  cellphoneTutor: string;
  documentNumber: string;
  email: string;
  schooling: string;
  grate: string;
  school: string;
  diagnosis: boolean;
  medicalReport: boolean;
  certificateDisability: boolean;
  conadisCard: boolean;
  psychologicalReport: boolean;
  state: string;
}

export type IStudentFilter = {
  documentNumber: string;
  lastName: string;
  names: string;
  state: string;
}

export interface IStudentListResponse {
  data: IStudent[];
  count: number;
  pageSize?: number;
  page?: number;
}

export type ISchemaList = 'documentNumber' | 'lastName' | 'names' | 'state';