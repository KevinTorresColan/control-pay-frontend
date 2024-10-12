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
  IPaymentType,
  IPaymentTypeFilter,
} from "@/pages/paymentType/interfaces";
import { IFormWrapperRef } from "@/interface";
import { usePaymentType } from "@/pages/paymentType/hooks";

const initialValue = {
  cleanFields: () => {},
  count: 0,
  dataTable: [] as IPaymentType[],
  handleChangePage: (_: unknown, __: number) => {},
  handleChangeRowsPerPage: (_: ChangeEvent<HTMLInputElement>) => {},
  handleSubmit: () => {},
  isLoadingList: true,
  page: 0,
  rowsPerPage: 0,
  ref: { current: null } as RefObject<IFormWrapperRef<IPaymentTypeFilter>>,
  methods: {},
};

export const PaymentTypeListContext = createContext(initialValue);

const PaymentTypeListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [dataTable, setDataTable] = useState<IPaymentType[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { paymentsType, isLoadingList } = usePaymentType();
  const ref = useRef<IFormWrapperRef<IPaymentTypeFilter>>(null);
  const methods = useForm();

  const cleanFields = () => methods.reset();

  const getListData = async (parameter: IPaymentTypeFilter) => {
    const { data } = await paymentsType(parameter);
    console.log(data);
    setDataTable(data.data);
    setCount(data.count);
  };

  const onSubmitSuccess = async (data: IPaymentTypeFilter) => {
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
    <PaymentTypeListContext.Provider value={values}>
      {children}
    </PaymentTypeListContext.Provider>
  );
};

export default PaymentTypeListProvider;
