import { ISchema } from "@/interface";
import { ISchemaCreateUpdate } from "../interfaces";

export const schemaCreateUpdate = (): Record<ISchemaCreateUpdate, ISchema> => ({
  address: {
    name: 'address',
  },
  name: {
    name: 'name',
    validations: {
      required: 'Este campo es requerido',
    },
  },
  state: {
    name: 'state',
    validations: {
      required: 'Este campo es requerido',
    },
  }
});