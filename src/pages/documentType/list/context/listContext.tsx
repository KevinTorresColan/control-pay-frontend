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
  IDocumentType,
  IDocumentTypeFilter,
} from "@/pages/documentType/interface";
import { useDocumentType } from "@/pages/documentType/hooks";
import { IFormWrapperRef } from "@/interface";

const initialValue = {
  cleanFields: () => {},
  count: 0,
  dataTable: [] as IDocumentType[],
  handleChangePage: (_: unknown, __: number) => {},
  handleChangeRowsPerPage: (_: ChangeEvent<HTMLInputElement>) => {},
  handleSubmit: () => {},
  isLoadingList: true,
  page: 0,
  rowsPerPage: 0,
  ref: { current: null } as RefObject<IFormWrapperRef<IDocumentTypeFilter>>,
  methods: {},
};

export const DocumentTypeListContext = createContext(initialValue);

const DocumentTypeListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [dataTable, setDataTable] = useState<IDocumentType[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { documentsType, isLoadingList } = useDocumentType();
  const ref = useRef<IFormWrapperRef<IDocumentTypeFilter>>(null);
  const methods = useForm();

  const cleanFields = () => methods.reset();

  const getDocumentsType = async (parameter: IDocumentTypeFilter) => {
    const { data } = await documentsType(parameter);
    console.log(data);
    setDataTable(data.data);
    setCount(data.count);
  };

  const onSubmitSuccess = async (data: IDocumentTypeFilter) => {
    getDocumentsType(data);
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
    getDocumentsType({ name: "", state: "" });
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
    <DocumentTypeListContext.Provider value={values}>
      {children}
    </DocumentTypeListContext.Provider>
  );
};

export default DocumentTypeListProvider;
