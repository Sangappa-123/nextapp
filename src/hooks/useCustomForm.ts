import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { BaseSchema, Output } from "valibot";

function useCustomForm<T extends BaseSchema>(schema: T) {
  const {
    register,
    handleSubmit,
    formState,
    control,
    setValue,
    watch,
    resetField,
    reset,
    setError,
    clearErrors,
    getValues,
    setField,
  } = useForm<Output<typeof schema>>({
    resolver: valibotResolver(schema),
  });
  return {
    register,
    handleSubmit,
    formState,
    control,
    setValue,
    watch,
    resetField,
    reset,
    setError,
    clearErrors,
    getValues,
    setField,
  };
}

export default useCustomForm;
