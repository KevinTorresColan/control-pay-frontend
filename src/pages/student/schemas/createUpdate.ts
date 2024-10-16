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
  idHeadquarter: {
    name: 'idHeadquarters',
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
  lastName: {
    name: 'lastName',
    validations: {
      required: 'Este campo es requerido',
    },
  },
  age: {
    name: 'age',
    type: 'tel'
  },
  birthday: {
    name: 'birthday',
  },
  address: {
    name: 'address',
  },
  tutorNames: {
    name: 'tutorNames',
    validations: {
      required: 'Este campo es requerido',
    },
  },
  tutorLastName: {
    name: 'tutorLastName',
    validations: {
      required: 'Este campo es requerido',
    },
  },
  cellphoneTutor: {
    name: 'cellphoneTutor',
    type: 'tel',
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
  schooling: {
    name: 'schooling',
  },
  grate: {
    name: 'grate',
  },
  school: {
    name: 'school',
  },
  diagnosis: {
    name: 'diagnosis',
  },
  medicalReport: {
    name: 'medicalReport',
  },
  certificateDisability: {
    name: 'certificateDisability',
  },
  conadisCard: {
    name: 'conadisCard',
  },
  psychologicalReport: {
    name: 'psychologicalReport',
  },
  state: {
    name: 'state',
    validations: {
      required: 'Este campo es requerido',
    },
  }
});