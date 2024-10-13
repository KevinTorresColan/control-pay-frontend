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
import { IRole, IRoleFilter } from "@/pages/role/interfaces";
import { IFormWrapperRef } from "@/interface";
import { useRole } from "@/pages/role/hooks";

const initialValue = {
  cleanFields: () => {},
  count: 0,
  dataTable: [] as IRole[],
  handleChangePage: (_: unknown, __: number) => {},
  handleChangeRowsPerPage: (_: ChangeEvent<HTMLInputElement>) => {},
  handleSubmit: () => {},
  isLoadingList: true,
  page: 0,
  rowsPerPage: 0,
  ref: { current: null } as RefObject<IFormWrapperRef<IRoleFilter>>,
  methods: {},
};

export const RoleListContext = createContext(initialValue);

const RoleListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [dataTable, setDataTable] = useState<IRole[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { roles, isLoadingList } = useRole();
  const ref = useRef<IFormWrapperRef<IRoleFilter>>(null);
  const methods = useForm();

  const cleanFields = () => methods.reset();

  const getListData = async (parameter: IRoleFilter) => {
    const { data } = await roles(parameter);
    console.log(data);
    setDataTable(data.data);
    setCount(data.count);
  };

  const onSubmitSuccess = async (data: IRoleFilter) => {
    getListData(data);
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
    getListData({ name: "", state: "" });
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
    <RoleListContext.Provider value={values}>
      {children}
    </RoleListContext.Provider>
  );
};

export default RoleListProvider;
