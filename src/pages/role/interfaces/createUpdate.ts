import { IRole } from "./list";

export type ISchemaCreateUpdate = 'name' | 'state';

export type IRoleCreateUpdate = Omit<IRole, 'id'>

