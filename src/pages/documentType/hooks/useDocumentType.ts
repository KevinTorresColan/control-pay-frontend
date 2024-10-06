import { useState } from "react";
import { AxiosResponse } from "axios";
import { IApiResponse } from "@/interface";
import { documentTypeRoutes, getApi, postApi, putApi } from "@/services";
import { IDocumentType, IDocumentTypeFilter, IDocumentTypeListResponse } from '../interface';
import { generateQuery } from "@/util";

export const useDocumentType = () => {
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);

  const documentsType = async (params: IDocumentTypeFilter): Promise<IApiResponse<IDocumentTypeListResponse>> => {
    setIsLoadingList(true);
    const url =  generateQuery(params, documentTypeRoutes.getAll);

    try {
      const response: AxiosResponse<IApiResponse<IDocumentTypeListResponse>> = await getApi(url);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: { data: [], count: 0 }, status: 500 };
    } finally {
      setIsLoadingList(false);
    }
  }

  const documentTypeById = async (id: string): Promise<IApiResponse<IDocumentType>> => {
    setIsLoadingUpdate(true);
    try {
      const response: AxiosResponse<IApiResponse<IDocumentType>> = await getApi(`${documentTypeRoutes.create}/${id}`);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: { id: 0, name: '',  state: '' }, status: 500 };
    } finally {
      setIsLoadingUpdate(false);
    }
  }

  const createDocumentType = async (params: IDocumentTypeFilter): Promise<IApiResponse<IDocumentType>> => {
    setIsLoadingCreate(true);
    try {
      const response: AxiosResponse<IApiResponse<IDocumentType>> = await postApi(documentTypeRoutes.create, params);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: { id: 0, name: '', state: '' }, status: 500 };
    } finally {
      setIsLoadingCreate(false);
    }
  };

  const updateDocumentType = async (id: string ,params: IDocumentTypeFilter): Promise<IApiResponse<IDocumentType>> => {
    setIsLoadingCreate(true);
    try {
      const response: AxiosResponse<IApiResponse<IDocumentType>> = await putApi(`${documentTypeRoutes.create}/${id}`, params);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: { id: 0, name: '', state: '' }, status: 500 };
    } finally {
      setIsLoadingCreate(false);
    }
  };

  return {
    createDocumentType,
    documentsType,
    documentTypeById,
    isLoadingCreate,
    isLoadingList,
    isLoadingUpdate,
    updateDocumentType
  }
}