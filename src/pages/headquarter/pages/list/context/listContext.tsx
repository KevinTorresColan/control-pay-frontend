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
import {
  IHeadquarter,
  IHeadquarterFilter,
} from "@/pages/headquarter/interfaces";
import { IFormWrapperRef } from "@/interface";
import { useHeadquarter } from "@/pages/headquarter/hooks";

const initialValue = {
  cleanFields: () => {},
  count: 0,
  dataTable: [] as IHeadquarter[],
  handleChangePage: (_: unknown, __: number) => {},
  handleChangeRowsPerPage: (_: ChangeEvent<HTMLInputElement>) => {},
  handleSubmit: () => {},
  isLoadingList: true,
  page: 0,
  rowsPerPage: 0,
  ref: { current: null } as RefObject<IFormWrapperRef<IHeadquarterFilter>>,
  methods: {},
};

export const HeadquarterListContext = createContext(initialValue);

const HeadquarterListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [dataTable, setDataTable] = useState<IHeadquarter[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { headquarters, isLoadingList } = useHeadquarter();
  const ref = useRef<IFormWrapperRef<IHeadquarterFilter>>(null);
  const methods = useForm();

  const cleanFields = () => methods.reset();

  const getListData = async (parameter: IHeadquarterFilter) => {
    const { data } = await headquarters(parameter);
    console.log(data);
    setDataTable(data.data);
    setCount(data.count);
  };

  const onSubmitSuccess = async (data: IHeadquarterFilter) => {
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
    getListData({ name: "", address: "", state: "" });
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
    <HeadquarterListContext.Provider value={values}>
      {children}
    </HeadquarterListContext.Provider>
  );
};

export default HeadquarterListProvider;
