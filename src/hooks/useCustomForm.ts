import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm, Controller } from "react-hook-form";
import { BaseSchema, Output } from "valibot";

function useCustomForm<T extends BaseSchema>(schema: T) {
  const { register, handleSubmit, formState, control } = useForm<
    Output<typeof schema>
  >({
    resolver: valibotResolver(schema),
  });
  return { register, handleSubmit, formState, Controller, control };
}

export default useCustomForm;
