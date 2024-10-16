import { IBank } from "./list";

export type ISchemaCreateUpdate = 'account' | 'cci' | 'name' | 'state';

export type IBankCreateUpdate = Omit<IBank, 'id'>

