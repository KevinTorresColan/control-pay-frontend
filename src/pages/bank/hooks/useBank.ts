import { useState } from "react";
import { AxiosResponse } from "axios";
import { IApiResponse } from "@/interface";
import { bankRoutes, getApi, postApi, putApi } from "@/services";
import { IBankFilter, IBankListResponse, IBank, IBankCreateUpdate } from '../interfaces';
import { generateQuery } from "@/util";

const bank = {
  id: 0, 
  account: '',
  cci: '',
  name: '', 
  state: ''
};

export const useBank = () => {
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);

  const banks = async (params: IBankFilter): Promise<IApiResponse<IBankListResponse>> => {
    setIsLoadingList(true);
    const url =  generateQuery(params, bankRoutes);

    try {
      const response: AxiosResponse<IApiResponse<IBankListResponse>> = await getApi(url);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: { data: [], count: 0 }, status: 500 };
    } finally {
      setIsLoadingList(false);
    }
  }

  const bankById = async (id: string): Promise<IApiResponse<IBank>> => {
    setIsLoadingUpdate(true);
    try {
      const response: AxiosResponse<IApiResponse<IBank>> = await getApi(`${bankRoutes}/${id}`);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: bank, status: 500 };
    } finally {
      setIsLoadingUpdate(false);
    }
  }

  const createBank = async (params: IBankCreateUpdate): Promise<IApiResponse<IBank>> => {
    setIsLoadingCreate(true);
    try {
      const response: AxiosResponse<IApiResponse<IBank>> = await postApi(bankRoutes, params);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: bank, status: 500 };
    } finally {
      setIsLoadingCreate(false);
    }
  };

  const updateBank = async (id: string ,params: IBankCreateUpdate): Promise<IApiResponse<IBank>> => {
    setIsLoadingCreate(true);
    try {
      const response: AxiosResponse<IApiResponse<IBank>> = await putApi(`${bankRoutes}/${id}`, params);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: bank, status: 500 };
    } finally {
      setIsLoadingCreate(false);
    }
  };

  return {
    bankById,
    banks,
    createBank,
    isLoadingCreate,
    isLoadingList,
    isLoadingUpdate,
    updateBank
  }
}