import { useState } from "react";
import { AxiosResponse } from "axios";
import { IApiResponse, ICombo } from "@/interface";
import { userRoutes, documentTypeRoutes, roleRoutes, getApi, postApi, putApi } from "@/services";
import { IUserFilter, IUserListResponse, IUser, IUserCreateUpdate } from '../interfaces';
import { generateQuery } from "@/util";
import { user } from "../data";

export const useUser = () => {
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);

  const users = async (params: IUserFilter): Promise<IApiResponse<IUserListResponse>> => {
    setIsLoadingList(true);
    const url = generateQuery(params, userRoutes);

    try {
      const response: AxiosResponse<IApiResponse<IUserListResponse>> = await getApi(url);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: { data: [], count: 0 }, status: 500 };
    } finally {
      setIsLoadingList(false);
    }
  };

  const userById = async (id: string): Promise<IApiResponse<IUser>> => {
    setIsLoadingUpdate(true);
    try {
      const response: AxiosResponse<IApiResponse<IUser>> = await getApi(`${userRoutes}/${id}`);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: user, status: 500 };
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const createUser = async (params: IUserCreateUpdate): Promise<IApiResponse<IUser>> => {
    setIsLoadingCreate(true);
    try {
      const response: AxiosResponse<IApiResponse<IUser>> = await postApi(userRoutes, params);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: user, status: 500 };
    } finally {
      setIsLoadingCreate(false);
    }
  };

  const updateUser = async (id: string ,params: IUserCreateUpdate): Promise<IApiResponse<IUser>> => {
    setIsLoadingCreate(true);
    try {
      const response: AxiosResponse<IApiResponse<IUser>> = await putApi(`${userRoutes}/${id}`, params);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: user, status: 500 };
    } finally {
      setIsLoadingCreate(false);
    }
  };

  const comboDocumentType = async (): Promise<IApiResponse<ICombo[]>> => {
    try {
      const response: AxiosResponse<IApiResponse<ICombo[]>> = await getApi(`${documentTypeRoutes}/combo`);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: [], status: 500 };
    }
  };

  const comboRol = async (): Promise<IApiResponse<ICombo[]>> => {
    try {
      const response: AxiosResponse<IApiResponse<ICombo[]>> = await getApi(`${roleRoutes}/combo`);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: [], status: 500 };
    }
  };

  return {
    createUser,
    comboDocumentType,
    comboRol,
    isLoadingCreate,
    isLoadingList,
    isLoadingUpdate,
    updateUser,
    userById,
    users,
  }
}