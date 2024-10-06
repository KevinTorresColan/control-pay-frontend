import { ISchema } from "@/interface";
import { ISchemaList } from "../interface";

export const schemaCreateUpdate = (): Record<ISchemaList, ISchema> => ({
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