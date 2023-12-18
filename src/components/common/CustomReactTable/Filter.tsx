"use client";
import React from "react";
import { RiFilter2Fill } from "react-icons/ri";
import GenericButton from "../GenericButton/index";
import CustomReactTableStyles from "./CustomReactTable.module.scss";

export default function Filter({
  column,
  table,
  showFilterBLock,
  setShowFilterBLock,
  defaultAllChecked = true,
  filterFn,
  customFilterValues,
}: {
  column: React.SetStateAction<any>;
  table: React.SetStateAction<any>;
  showFilterBLock: React.SetStateAction<string | null>;
  setShowFilterBLock: React.SetStateAction<any>;
  defaultAllChecked: React.SetStateAction<boolean | undefined>;
  filterFn: React.SetStateAction<any | null>;
  customFilterValues: React.SetStateAction<any | null>;
}) {
  const [currentValue, setCurrentValue] = React.useState<React.SetStateAction<any>>([]);
  const [sortedUniqueValuesFirst, setSortedUniqueValuesFirst] = React.useState<
    React.SetStateAction<any>
  >([]);

  const [isSelectAllChecked, setIsSelectAllChecked] =
    React.useState<React.SetStateAction<any>>(false);
  // const [preCheckedValue, setPreCheckedValue] =
  // React.useState<React.SetStateAction<boolean>>(false);

  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  React.useEffect(() => {
    if (defaultAllChecked && sortedUniqueValues && sortedUniqueValuesFirst.length === 0) {
      const uniqueValues = sortedUniqueValues.map((row) => {
        return row === null || row === undefined ? "BLANK" : row;
      });
      setCurrentValue(uniqueValues);
      setSortedUniqueValuesFirst(uniqueValues);
    }
  }, [sortedUniqueValues]);

  // return typeof firstValue === 'number' ? (
  //   <div>
  //     <div className="flex space-x-2">
  //       <DebouncedInput
  //         type="number"
  //         min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
  //         max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
  //         value={(columnFilterValue as [number, number])?.[0] ?? ''}
  //         onChange={value =>
  //           column.setFilterValue((old: [number, number]) => [value, old?.[1]])
  //         }
  //         placeholder={`Min ${
  //           column.getFacetedMinMaxValues()?.[0]
  //             ? `(${column.getFacetedMinMaxValues()?.[0]})`
  //             : ''
  //         }`}
  //         className="w-24 border shadow rounded"
  //       />
  //       <DebouncedInput
  //         type="number"
  //         min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
  //         max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
  //         value={(columnFilterValue as [number, number])?.[1] ?? ''}
  //         onChange={value =>
  //           column.setFilterValue((old: [number, number]) => [old?.[0], value])
  //         }
  //         placeholder={`Max ${
  //           column.getFacetedMinMaxValues()?.[1]
  //             ? `(${column.getFacetedMinMaxValues()?.[1]})`
  //             : ''
  //         }`}
  //         className="w-24 border shadow rounded"
  //       />
  //     </div>
  //     <div className="h-1" />
  //   </div>
  // ) : (
  //   <>
  //     <datalist id={column.id + 'list'}>
  //       {sortedUniqueValues.slice(0, 5000).map((value: any) => (
  //         <option value={value} key={value} />
  //       ))}
  //     </datalist>
  //     <DebouncedInput
  //       type="text"
  //       value={(columnFilterValue ?? '') as string}
  //       onChange={value => column.setFilterValue(value)}
  //       placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
  //       className="w-36 border shadow rounded"
  //       list={column.id + 'list'}
  //     />
  //     <div className="h-1" />
  //   </>
  // )
  const handleFilterIconClick = (columnId: any) => {
    if (showFilterBLock === columnId) {
      setShowFilterBLock(null);
    } else {
      setShowFilterBLock(columnId);
    }
  };
  const handleChecked = (e: { target: { value: React.SetStateAction<any> } }) => {
    const checked = currentValue.filter((item: string) => item === e.target.value);

    if (checked.length > 0) {
      setCurrentValue((current: any) =>
        current.filter((item: string) => {
          return item !== e.target.value;
        })
      );
    } else {
      setCurrentValue([...currentValue, e.target.value]);
    }
    // column.setFilterValue([...currentValue, e.target.value]);
  };
  const handleSubmit = () => {
    if (filterFn) {
      filterFn(currentValue, column.id);
    }
    setShowFilterBLock(null);
  };
  const isChecked = (checkedValue: string) => {
    const checked = currentValue.filter((item: string) => item === checkedValue);

    if (checked.length != 0) {
      return true;
    }
    return false;
  };
  const handleSelectAll = () => {
    if (customFilterValues) {
      if (customFilterValues.length !== currentValue.length) {
        const custArr: any = [];
        customFilterValues.map((item: any) => {
          custArr.push(item.name);
        });
        setCurrentValue(custArr);
      } else {
        setCurrentValue([]);
      }
    } else {
      if (sortedUniqueValuesFirst.length !== currentValue.length) {
        const custArr: any = [];
        sortedUniqueValuesFirst.map((item: any) => {
          custArr.push(item);
        });
        setCurrentValue(custArr);
      } else {
        setCurrentValue([]);
      }
    }
  };
  React.useEffect(() => {
    if (customFilterValues) {
      if (customFilterValues.length !== currentValue.length) {
        setIsSelectAllChecked(false);
      } else {
        setIsSelectAllChecked(true);
      }
    } else {
      if (sortedUniqueValuesFirst.length !== currentValue.length) {
        setIsSelectAllChecked(false);
      } else {
        setIsSelectAllChecked(true);
      }
    }
  }, [currentValue]);

  return (
    <div className="position-relative">
      <span onClick={() => handleFilterIconClick(column.id)}>
        <RiFilter2Fill color="#337ab7" size="20px" />
      </span>
      {showFilterBLock === column.id && (
        <div className={CustomReactTableStyles.filterPopUp} id={column.id + "list"}>
          <div className={CustomReactTableStyles.filterHeader}>
            <input
              type="checkbox"
              className={CustomReactTableStyles.filterCheckBox}
              id="selectAll"
              name="selectAll"
              value="all"
              onChange={handleSelectAll}
              checked={isSelectAllChecked}
            />
            <label> Select All</label>
          </div>
          <div className={CustomReactTableStyles.filterContents}>
            {typeof firstValue === "number" ? (
              <>
                <div className={CustomReactTableStyles.filterContainer}>
                  <input
                    type="checkbox"
                    className={CustomReactTableStyles.filterCheckBox}
                    id="selectAll"
                    name="selectAll"
                    value="all"
                    defaultChecked={true}
                  />
                  $0.00 - $24.99
                </div>
                <div className={CustomReactTableStyles.filterContainer}>
                  <input
                    type="checkbox"
                    className={CustomReactTableStyles.filterCheckBox}
                    id="selectAll"
                    name="selectAll"
                    value="all"
                    defaultChecked={true}
                  />
                  $25.00 - $99.99{" "}
                </div>

                <div className={CustomReactTableStyles.filterContainer}>
                  <input
                    type="checkbox"
                    className={CustomReactTableStyles.filterCheckBox}
                    id="selectAll"
                    name="selectAll"
                    value="all"
                    defaultChecked={true}
                  />
                  $100.00 - $999.99
                </div>
                <div className={CustomReactTableStyles.filterContainer}>
                  <input
                    type="checkbox"
                    className={CustomReactTableStyles.filterCheckBox}
                    id="selectAll"
                    name="selectAll"
                    value="all"
                    defaultChecked={true}
                  />
                  $1,000.00+
                </div>
              </>
            ) : (
              <>
                {filterFn && customFilterValues ? (
                  <>
                    {customFilterValues
                      .slice(0, 5000)
                      .map((value: any, index: number) => (
                        <div
                          className={CustomReactTableStyles.filterContainer}
                          key={index}
                        >
                          <input
                            type="checkbox"
                            className={CustomReactTableStyles.filterCheckBox}
                            id="selectAll"
                            name="selectAll"
                            value={value.name}
                            onChange={handleChecked}
                            checked={isChecked(value.name)}
                          />
                          {value.name ?? "BLANK"}
                        </div>
                      ))}
                  </>
                ) : (
                  <>
                    {sortedUniqueValuesFirst
                      .slice(0, 5000)
                      .map((value: any, index: number) => (
                        <div
                          className={CustomReactTableStyles.filterContainer}
                          key={index}
                        >
                          <input
                            type="checkbox"
                            className={CustomReactTableStyles.filterCheckBox}
                            id="selectAll"
                            name="selectAll"
                            value={value ?? "BLANK"}
                            onChange={handleChecked}
                            checked={isChecked(value ?? "BLANK")}
                          />
                          {value ?? "BLANK"}
                        </div>
                      ))}
                  </>
                )}
              </>
            )}
          </div>
          <div className={CustomReactTableStyles.actionButtons}>
            <a onClick={() => setShowFilterBLock(null)}>Cancel</a>
            <GenericButton
              label="OK"
              theme="lightBlue"
              size="small"
              type="submit"
              onClickHandler={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// A debounced input react component
//   function DebouncedInput({
//     value: initialValue,
//     onChange,
//     debounce = 500,
//     ...props
//   }: {
//     value: string | number
//     onChange: (value: string | number) => void
//     debounce?: number
//   } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
//     const [value, setValue] = React.useState(initialValue)

//     React.useEffect(() => {
//       setValue(initialValue)
//     }, [initialValue])

//     React.useEffect(() => {
//       const timeout = setTimeout(() => {
//         onChange(value)
//       }, debounce)

//       return () => clearTimeout(timeout)
//     }, [value])

//     return (
//       <input {...props} value={value} onChange={e => setValue(e.target.value)} />
//     )
//   }
