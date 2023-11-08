import { TypedOption } from "@/components/common/GenericSelect";
import { useState } from "react";

type TypedProps = TypedOption[];

function useSelectOption(originalOption: TypedProps) {
  //   const { originalOption = [] } = props;
  const [options, setOptions] = useState(originalOption);

  const filterOption = (selected: TypedOption, filterBy: keyof TypedOption) => {
    if (selected === null) {
      setOptions(originalOption);
    }
    const filteredOption = originalOption.filter(
      (option) => option.label !== selected.label
    );
    setOptions(filteredOption);
  };

  return { options, filterOption };
}

export default useSelectOption;
