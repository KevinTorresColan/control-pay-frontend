import { useContext } from "react";
import { UseFormReturn } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { FormController, SearchFilter, SelectController } from "@/components";
import { BankListContext } from "../context";
import { state } from "@/data";
import { schemaList } from "@/pages/bank/schemas";

const FilterModule = () => {
  const { cleanFields, handleSubmit, isLoadingList, methods, ref } =
    useContext(BankListContext);
  const schema = schemaList();

  return (
    <SearchFilter
      cleanFields={cleanFields}
      handleSubmit={handleSubmit}
      isLoading={isLoadingList}
      methods={methods as UseFormReturn}
      ref={ref}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <FormController schema={schema.name} label="Banco" />
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <SelectController data={state} schema={schema.state} label="Estado" />
        </Grid>
      </Grid>
    </SearchFilter>
  );
};

export default FilterModule;
