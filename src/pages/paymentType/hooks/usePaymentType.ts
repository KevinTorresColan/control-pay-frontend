import { useState } from "react";
import { AxiosResponse } from "axios";
import { IApiResponse } from "@/interface";
import { paymentTypeRoutes, getApi, postApi, putApi } from "@/services";
import { IPaymentTypeFilter, IPaymentTypeListResponse, IPaymentType, IPaymentTypeCreateUpdate } from '../interfaces';
import { generateQuery } from "@/util";

const paymentType = {
  id: 0, 
  name: '', 
  state: ''
};

export const usePaymentType = () => {
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);

  const paymentsType = async (params: IPaymentTypeFilter): Promise<IApiResponse<IPaymentTypeListResponse>> => {
    setIsLoadingList(true);
    const url =  generateQuery(params, paymentTypeRoutes);

    try {
      const response: AxiosResponse<IApiResponse<IPaymentTypeListResponse>> = await getApi(url);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: { data: [], count: 0 }, status: 500 };
    } finally {
      setIsLoadingList(false);
    }
  }

  const paymentTypeById = async (id: string): Promise<IApiResponse<IPaymentType>> => {
    setIsLoadingUpdate(true);
    try {
      const response: AxiosResponse<IApiResponse<IPaymentType>> = await getApi(`${paymentTypeRoutes}/${id}`);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: paymentType, status: 500 };
    } finally {
      setIsLoadingUpdate(false);
    }
  }

  const createPaymentType = async (params: IPaymentTypeCreateUpdate): Promise<IApiResponse<IPaymentType>> => {
    setIsLoadingCreate(true);
    try {
      const response: AxiosResponse<IApiResponse<IPaymentType>> = await postApi(paymentTypeRoutes, params);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: paymentType, status: 500 };
    } finally {
      setIsLoadingCreate(false);
    }
  };

  const updatePaymentType = async (id: string ,params: IPaymentTypeCreateUpdate): Promise<IApiResponse<IPaymentType>> => {
    setIsLoadingCreate(true);
    try {
      const response: AxiosResponse<IApiResponse<IPaymentType>> = await putApi(`${paymentTypeRoutes}/${id}`, params);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: paymentType, status: 500 };
    } finally {
      setIsLoadingCreate(false);
    }
  };

  return {
    createPaymentType,
    isLoadingCreate,
    isLoadingList,
    isLoadingUpdate,
    paymentsType,
    paymentTypeById,
    updatePaymentType
  }
}