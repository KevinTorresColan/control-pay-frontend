import { ISchema } from "@/interface";
import { ISchemaCreateUpdate } from "../interfaces";
import { patterns } from "@/patterns";

export const schemaCreateUpdate = (): Record<ISchemaCreateUpdate, ISchema> => ({
  idDocumentsType: {
    name: 'idDocumentsType',
    validations: {
      required: 'Este campo es requerido',
    },
  },
  idRole: {
    name: 'idRole',
    validations: {
      required: 'Este campo es requerido',
    },
  },
  address: {
    name: 'address',
  },
  age: {
    name: 'age',
    type: 'tel'
  },
  birthday: {
    name: 'birthday',
  },
  cellPhone: {
    name: 'cellPhone',
  },
  documentNumber: {
    name: 'documentNumber',
    type: 'tel',
    validations: {
      required: 'Este campo es requerido',
    },
  },
  email: {
    name: 'email',
    type: 'email',
    validations: {
      pattern: {
        value: patterns.email,
        message: 'Correo no valido',
      },
      required: 'Este campo es requerido',
    },
  },
  lastName: {
    name: 'lastName',
    validations: {
      required: 'Este campo es requerido',
    },
  },
  names: {
    name: 'names',
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