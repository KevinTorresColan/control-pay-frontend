import { IStudent } from "./list";

export type ISchemaCreateUpdate = 'idDocumentsType' | 'idHeadquarter' | 'names' | 'lastName' | 'age' | 'birthday' |'address' | 'tutorNames' | 'tutorLastName' | 'cellphoneTutor' | 'documentNumber' | 'email' | 'schooling' | 'grate' | 'school' | 'diagnosis' | 'medicalReport' | 'certificateDisability' | 'conadisCard' | 'psychologicalReport' | 'state';

export type IStudentCreateUpdate = Omit<IStudent, 'id'>

