import { ISchema } from "@/interface";
import { ISchemaList } from "../interfaces";

export const schemaList = (): Record<ISchemaList, ISchema> => ({
  documentNumber: {
    name: 'documentNumber',
  },
  lastName: {
    name: 'lastName',
  },
  names: {
    name: 'names',
  },
  state: {
    name: 'state',
  }
});