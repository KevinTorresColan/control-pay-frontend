import {
  createContext,
  useState,
  ChangeEvent,
  useEffect,
  PropsWithChildren,
  useRef,
  FC,
  RefObject,
} from "react";
import { useForm } from "react-hook-form";
import { IStudent, IStudentFilter } from "@/pages/student/interfaces";
import { IFormWrapperRef } from "@/interface";
import { useStudent } from "@/pages/student/hooks";
import { student } from "@/pages/student/data";

const initialValue = {
  cleanFields: () => {},
  count: 0,
  dataTable: [] as IStudent[],
  handleChangePage: (_: unknown, __: number) => {},
  handleChangeRowsPerPage: (_: ChangeEvent<HTMLInputElement>) => {},
  handleSubmit: () => {},
  isLoadingList: true,
  page: 0,
  rowsPerPage: 0,
  ref: { current: null } as RefObject<IFormWrapperRef<IStudentFilter>>,
  methods: {},
};

export const StudentListContext = createContext(initialValue);

const StudentListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [dataTable, setDataTable] = useState<IStudent[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { students, isLoadingList } = useStudent();
  const ref = useRef<IFormWrapperRef<IStudentFilter>>(null);
  const methods = useForm();

  const cleanFields = () => methods.reset();

  const getListData = async (parameter: IStudentFilter) => {
    const { data } = await students(parameter);
    console.log(data);
    setDataTable(data.data);
    setCount(data.count);
  };

  const onSubmitSuccess = async (data: IStudentFilter) => {
    const dataFilter = {
      documentNumber: data.documentNumber,
      lastName: data.lastName,
      names: data.names,
      state: data.state,
    };
    getListData(dataFilter);
  };

  const handleSubmit = () => {
    ref.current!.submit(onSubmitSuccess);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    const pageSize = parseInt(target.value, 10);
    setRowsPerPage(pageSize);
    setPage(0);
  };

  useEffect(() => {
    getListData(student);
  }, []);

  const values = {
    cleanFields,
    count,
    dataTable,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSubmit,
    isLoadingList,
    page,
    ref,
    rowsPerPage,
    methods,
  };

  return (
    <StudentListContext.Provider value={values}>
      {children}
    </StudentListContext.Provider>
  );
};

export default StudentListProvider;
