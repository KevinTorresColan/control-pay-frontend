import { ISchema } from "@/interface";
import { ISchemaCreateUpdate } from "../interfaces";

export const schemaCreateUpdate = (): Record<ISchemaCreateUpdate, ISchema> => ({
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