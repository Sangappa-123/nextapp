import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { BaseSchema, Output } from "valibot";

function useCustomForm<T extends BaseSchema>(schema: T) {
  const { register, handleSubmit, formState } = useForm<Output<typeof schema>>({
    resolver: valibotResolver(schema),
  });
  return { register, handleSubmit, formState };
}

export default useCustomForm;
