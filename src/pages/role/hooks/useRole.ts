import { useState } from "react";
import { AxiosResponse } from "axios";
import { IApiResponse } from "@/interface";
import { roleRoutes, getApi, postApi, putApi } from "@/services";
import { IRoleFilter, IRoleListResponse, IRole, IRoleCreateUpdate } from '../interfaces';
import { generateQuery } from "@/util";

const role = {
  id: 0, 
  name: '', 
  state: ''
};

export const useRole = () => {
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);

  const roles = async (params: IRoleFilter): Promise<IApiResponse<IRoleListResponse>> => {
    setIsLoadingList(true);
    const url =  generateQuery(params, roleRoutes);

    try {
      const response: AxiosResponse<IApiResponse<IRoleListResponse>> = await getApi(url);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: { data: [], count: 0 }, status: 500 };
    } finally {
      setIsLoadingList(false);
    }
  }

  const roleById = async (id: string): Promise<IApiResponse<IRole>> => {
    setIsLoadingUpdate(true);
    try {
      const response: AxiosResponse<IApiResponse<IRole>> = await getApi(`${roleRoutes}/${id}`);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: role, status: 500 };
    } finally {
      setIsLoadingUpdate(false);
    }
  }

  const createRole = async (params: IRoleCreateUpdate): Promise<IApiResponse<IRole>> => {
    setIsLoadingCreate(true);
    try {
      const response: AxiosResponse<IApiResponse<IRole>> = await postApi(roleRoutes, params);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: role, status: 500 };
    } finally {
      setIsLoadingCreate(false);
    }
  };

  const updateRole = async (id: string ,params: IRoleCreateUpdate): Promise<IApiResponse<IRole>> => {
    setIsLoadingCreate(true);
    try {
      const response: AxiosResponse<IApiResponse<IRole>> = await putApi(`${roleRoutes}/${id}`, params);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: role, status: 500 };
    } finally {
      setIsLoadingCreate(false);
    }
  };

  return {
    createRole,
    isLoadingCreate,
    isLoadingList,
    isLoadingUpdate,
    roleById,
    roles,
    updateRole
  }
}