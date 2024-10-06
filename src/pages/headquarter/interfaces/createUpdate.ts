import { IHeadquarter } from "./list";

export type ISchemaCreateUpdate = 'name' | 'address' | 'state';

export type IHeadquarterCreateUpdate = Omit<IHeadquarter, 'id'>

