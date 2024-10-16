import { ISchema } from "@/interface";
import { ISchemaCreateUpdate } from "../interfaces";

export const schemaCreateUpdate = (): Record<ISchemaCreateUpdate, ISchema> => ({
  account: {
    name: 'account',
    validations: {
      required: 'Este campo es requerido',
    },
  },
  cci: {
    name: 'cci',
    validations: {
      required: 'Este campo es requerido',
    },
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