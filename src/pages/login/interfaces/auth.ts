export interface ILogin {
  email: string; 
  password: string;
}

export interface IUserLogin {
  token: string;
  user: {
    id: number;
    name: string;
    lastName: string;
    email: string;
  }
}

export interface IPasswordRecovery {
  code: string; 
  password: string;
  passwordRepeat: string;
}