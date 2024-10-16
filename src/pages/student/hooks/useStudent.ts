import { useState } from "react";
import { AxiosResponse } from "axios";
import { IApiResponse, ICombo } from "@/interface";
import { studentRoutes, documentTypeRoutes, headquarterRoutes, getApi, postApi, putApi } from "@/services";
import { IStudentFilter, IStudentListResponse, IStudent, ISchemaCreateUpdate } from '../interfaces';
import { generateQuery } from "@/util";
import { student } from "../data";

export const useStudent = () => {
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);

  const students = async (params: IStudentFilter): Promise<IApiResponse<IStudentListResponse>> => {
    setIsLoadingList(true);
    const url = generateQuery(params, studentRoutes);

    try {
      const response: AxiosResponse<IApiResponse<IStudentListResponse>> = await getApi(url);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: { data: [], count: 0 }, status: 500 };
    } finally {
      setIsLoadingList(false);
    }
  };

  const studentById = async (id: string): Promise<IApiResponse<IStudent>> => {
    setIsLoadingUpdate(true);
    try {
      const response: AxiosResponse<IApiResponse<IStudent>> = await getApi(`${studentRoutes}/${id}`);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: student, status: 500 };
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const createStudent = async (params: ISchemaCreateUpdate): Promise<IApiResponse<IStudent>> => {
    setIsLoadingCreate(true);
    try {
      const response: AxiosResponse<IApiResponse<IStudent>> = await postApi(studentRoutes, params);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: student, status: 500 };
    } finally {
      setIsLoadingCreate(false);
    }
  };

  const updateStudent = async (id: string ,params: ISchemaCreateUpdate): Promise<IApiResponse<IStudent>> => {
    setIsLoadingCreate(true);
    try {
      const response: AxiosResponse<IApiResponse<IStudent>> = await putApi(`${studentRoutes}/${id}`, params);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: student, status: 500 };
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

  const comboHeadquarter = async (): Promise<IApiResponse<ICombo[]>> => {
    try {
      const response: AxiosResponse<IApiResponse<ICombo[]>> = await getApi(`${headquarterRoutes}/combo`);
      const { data, message, status } = response.data ;
      
      return { data, message, status };
    } catch (_) {
      return { message: 'Ocurrio un error.' , data: [], status: 500 };
    }
  };

  return {
    createStudent,
    comboDocumentType,
    comboHeadquarter,
    isLoadingCreate,
    isLoadingList,
    isLoadingUpdate,
    updateStudent,
    studentById,
    students,
  }
}