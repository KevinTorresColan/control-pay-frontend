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
import { IBank, IBankFilter } from "@/pages/bank/interfaces";
import { IFormWrapperRef } from "@/interface";
import { useBank } from "@/pages/bank/hooks";

const initialValue = {
  cleanFields: () => {},
  count: 0,
  dataTable: [] as IBank[],
  handleChangePage: (_: unknown, __: number) => {},
  handleChangeRowsPerPage: (_: ChangeEvent<HTMLInputElement>) => {},
  handleSubmit: () => {},
  isLoadingList: true,
  page: 0,
  rowsPerPage: 0,
  ref: { current: null } as RefObject<IFormWrapperRef<IBankFilter>>,
  methods: {},
};

export const BankListContext = createContext(initialValue);

const BankListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [dataTable, setDataTable] = useState<IBank[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { banks, isLoadingList } = useBank();
  const ref = useRef<IFormWrapperRef<IBankFilter>>(null);
  const methods = useForm();

  const cleanFields = () => methods.reset();

  const getListData = async (parameter: IBankFilter) => {
    const { data } = await banks(parameter);
    console.log(data);
    setDataTable(data.data);
    setCount(data.count);
  };

  const onSubmitSuccess = async (data: IBankFilter) => {
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
    <BankListContext.Provider value={values}>
      {children}
    </BankListContext.Provider>
  );
};

export default BankListProvider;
