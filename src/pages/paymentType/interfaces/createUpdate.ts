import { IPaymentType } from "./list";

export type ISchemaCreateUpdate = 'name' | 'state';

export type IPaymentTypeCreateUpdate = Omit<IPaymentType, 'id'>

