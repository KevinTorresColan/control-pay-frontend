import { useState } from "react";
import { AxiosResponse } from "axios";
import { authRoutes, postApi, setCookies } from "@/services";
import { IApiResponse } from "@/interface";
import { ILogin, IPasswordRecovery, IUser, IUserLogin } from '../interfaces';

const initialDataUserRegister: IUser = {
  name: '',
  email: '', 
  password: '',
  passwordRepeat: '',
  documentType: '0',
  documentNumber: '',
  address: '',
  cellphone: ''
}

const initialDateUserLogin: IUserLogin = {
  token: '',
  user: {
    id: 0,
    name: '',
    lastName: '',
    email: ''
  }
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const registerUser = async (user: IUser): Promise<IApiResponse<IUser>> => {
    setIsLoading(true);

    try {
      const response: AxiosResponse<IApiResponse<IUser>> = await postApi(authRoutes.registerUser, user);
      const { data, message, status } = response.data ;

      return { data, message, status };
    } 
    catch (_) { 
      return { message: 'Ocurrio un error.' , data: initialDataUserRegister, status: 500 };
    } 
    finally { setIsLoading(false) }
  };

  const login = async (credential: ILogin): Promise<IApiResponse<IUserLogin>> => {
    setIsLoading(true);

    try {
      const response: AxiosResponse<IApiResponse<IUserLogin>> = await postApi(authRoutes.login, credential);
      const { data, message, status } = response.data;
      
      if(data?.token) setCookies('token', data?.token);
      return { data, message, status };
    } 
    catch (_) { 
      return { message: 'Ocurrio un error.' , data: initialDateUserLogin, status: 500 };
    } 
    finally { 
      setIsLoading(false) 
    }
  };

  const passwordRecovery = async (email: Omit<ILogin, 'password'>): Promise<IApiResponse<IUserLogin>> => {
    setIsLoading(true);

    try {
      const response: AxiosResponse<IApiResponse<IUserLogin>> = await postApi(authRoutes.passwordRecovery, email);
      const { data, message, status } = response.data;

      return { data, message, status };
    } 
    catch (_) { 
      return { message: 'Ocurrio un error.' , data: initialDateUserLogin, status: 500 };
    } 
    finally { setIsLoading(false) }
  };

  const passwordChange = async (senData: IPasswordRecovery): Promise<IApiResponse<IUserLogin>> => {
    setIsLoading(true);

    try {
      const response: AxiosResponse<IApiResponse<IUserLogin>> = await postApi(authRoutes.passwordChange, senData);
      console.log(response);
      const { data, message, status } = response.data;

      return { data, message, status };
    } 
    catch (_) { 
      return { message: 'Ocurrio un error.' , data: initialDateUserLogin, status: 500 };
    } 
    finally { setIsLoading(false) }
  };

  return { isLoading, registerUser, login, passwordChange, passwordRecovery };
};