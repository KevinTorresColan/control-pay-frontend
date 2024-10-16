import { useState } from "react";
import { AxiosResponse } from "axios";
import { IApiResponse } from "@/interface";
import { headquarterRoutes, getApi, postApi, putApi } from "@/services";
import { IHeadquarter, IHeadquarterCreateUpdate, IHeadquarterFilter, IHeadquarterListResponse } from '../interfaces';
import { generateQuery } from "@/util";

const headquarter = {
  id: 0, 
  name: '', 
  address: '', 
  state: ''
};

export const useHeadquarter = () => {
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);

  const headquarters = async (params: IHeadquarterFilter): Promise<IApiResponse<IHeadquarterListResponse>> => {
    setIsLoadingList(true);
    const url =  generateQuery(params, headquarterRoutes);

    try {
      const response: AxiosResponse<IApiResponse<IHeadquarterListResponse>> = await getApi(url);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: { data: [], count: 0 }, status: 500 };
    } finally {
      setIsLoadingList(false);
    }
  }

  const headquarterById = async (id: string): Promise<IApiResponse<IHeadquarter>> => {
    setIsLoadingUpdate(true);
    try {
      const response: AxiosResponse<IApiResponse<IHeadquarter>> = await getApi(`${headquarterRoutes}/${id}`);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: headquarter, status: 500 };
    } finally {
      setIsLoadingUpdate(false);
    }
  }

  const createHeadquarter = async (params: IHeadquarterCreateUpdate): Promise<IApiResponse<IHeadquarter>> => {
    setIsLoadingCreate(true);
    try {
      const response: AxiosResponse<IApiResponse<IHeadquarter>> = await postApi(headquarterRoutes, params);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: headquarter, status: 500 };
    } finally {
      setIsLoadingCreate(false);
    }
  };

  const updateHeadquarter = async (id: string ,params: IHeadquarterCreateUpdate): Promise<IApiResponse<IHeadquarter>> => {
    setIsLoadingCreate(true);
    try {
      const response: AxiosResponse<IApiResponse<IHeadquarter>> = await putApi(`${headquarterRoutes}/${id}`, params);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: headquarter, status: 500 };
    } finally {
      setIsLoadingCreate(false);
    }
  };

  return {
    createHeadquarter,
    headquarters,
    headquarterById,
    isLoadingCreate,
    isLoadingList,
    isLoadingUpdate,
    updateHeadquarter
  }
}