import { IUser } from "./list";

export type ISchemaCreateUpdate = 'idDocumentsType' | 'idRole' | 'address' | 'age' | 'birthday' | 'cellPhone' |'documentNumber' | 'email' | 'lastName' | 'names' | 'state';

export type IUserCreateUpdate = Omit<IUser, 'id'>

