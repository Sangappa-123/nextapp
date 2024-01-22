"use client";
import React, { useState, useEffect } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  Row,
} from "@tanstack/react-table";
import CustomReactTable from "@/components/common/CustomReactTable";
import VendorListStyle from "./vendorAssignListTable.module.scss";
import GenericSelect from "@/components/common/GenericSelect";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";
import {
  fetchVendorInventoryAction,
  updateVendorAssignmentPayload,
} from "@/reducers/UploadCSV/AddItemsTableCSVSlice";
import selectCRN from "@/reducers/Session/Selectors/selectCRN";
import { selectVendor } from "@/services/ClaimService";
import { useDispatch } from "react-redux";

interface VendorItemsTableProps {
  vendorInventoryListAPIData: Array<object>;
  fetchVendorInventoryAction: any;
  CRN: any;
}

const VendorAssignListTable: React.FC<connectorType> = (props: VendorItemsTableProps) => {
  const { fetchVendorInventoryAction, vendorInventoryListAPIData, CRN } = props;
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedServices, setSelectedServices] = useState<ContentService[]>([]);
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [selectedSubservices, setSelectedSubservices] = useState<any[]>([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);
  const [selectedSubservicesServices, setSelectedSubservicesServices] = useState<
    { name: string }[]
  >([]);

  // const [selectedService, setSelectedService] = useState<any>(null);
  const ClaimProfile = process.env.NEXT_PUBLIC_CLAIM_PROFILE;

  useEffect(() => {
    fetchVendorInventoryAction({
      pageNo: 1,
      recordPerPage: 10,
    });
  }, [fetchVendorInventoryAction]);

  type Address = {
    city: string;
    completeAddress: string;
  };

  type SpecializedCategory = {
    id: number;
    speciality: string;
    noOfItems: number;
  };

  type ContentService = {
    service: string;
    id: number;
    subServices?: any[];
  };

  type VendorData = {
    contentServices: ContentService[];
    id: any;
    select: boolean;
    name: string;
    assignmentsInHand: number;
    itemsInHand: number;
    specializedCategories: SpecializedCategory[];
    shippingAddress: Address;
    registrationNumber: string;
    // description: string;
  };

  const columnHelper = createColumnHelper<VendorData>();
  const checkboxAccessor = (data: VendorData) => data.select;

  const handleServiceChange = (selectedOption: any) => {
    const service = selectedServices.find(
      (selectService) => selectService.id === selectedOption?.value
    );

    if (service) {
      const subservices = service.subServices || [];
      setSelectedSubservices(subservices);
      setSelectedSubservicesServices([]);
      dispatch(
        updateVendorAssignmentPayload({
          requestedVendorService: {
            id: service.id,
            name: service.service,
            subContentServices: subservices.map((subservice) => ({
              name: subservice.service,
            })),
          },
        })
      );
    } else {
      setSelectedSubservices([]);
      setSelectedSubservicesServices([]);
      dispatch(
        updateVendorAssignmentPayload({
          requestedVendorService: {},
        })
      );
    }
  };

  const dispatch = useDispatch();
  const claimNumber = sessionStorage.getItem("claimNumber") || "";
  const handleRowSelection = async (row: Row<VendorData>) => {
    console.log("Row selected", row);
    const registrationNumber = row.original.registrationNumber;
    console.log("Registration number", registrationNumber);
    dispatch(
      updateVendorAssignmentPayload({
        vendorDetails: {
          registrationNumber,
        },
        claimBasicDetails: {
          claimNumber,
        },
        insuranceCompanyDetails: {
          crn: CRN,
        },
        vendorAssigment: {
          claimNumber: claimNumber,
          dueDate: null,
          remark: null,
        },
      })
    );
    try {
      const result = await selectVendor({ registrationNumber, categories: null });
      console.log(result);
      console.log("assssaaaaaaaaaaaa", props);
      if (result?.data && result?.data.contentServices) {
        const services = result.data.contentServices;
        console.log("qqqAazxzzzzzzzzzz", services);
        const newFilteredServices = services.filter((service: any) => {
          if (ClaimProfile === "Jewelry") {
            return service.service !== "Salvage Only";
          } else {
            return true;
          }
        });
        setSelectedServices(newFilteredServices);
        console.log("qqqqssssss", ClaimProfile);
        // setSelectedSubServices([]);
        setSelectedSubservices([]);
        setSelectedValue(null);
      } else {
        console.log("no found in the API ");
      }
    } catch (error) {
      console.error("Error calling selectVendor API", error);
    }
  };

  useEffect(() => {
    if (selectedValue && selectedSubservicesServices.length > 0) {
      dispatch(
        updateVendorAssignmentPayload({
          requestedVendorService: {
            id: selectedValue.value,
            name: selectedValue.label,
            subContentServices: selectedSubservicesServices,
          },
        })
      );
    }
  }, [dispatch, selectedValue, selectedSubservicesServices]);

  const handleCheckboxChange = (checkboxId: number) => {
    const subservice = selectedSubservices.find(
      (subservice) => subservice.id === checkboxId
    );

    if (subservice) {
      if (selectedCheckboxes.includes(checkboxId)) {
        setSelectedCheckboxes(selectedCheckboxes.filter((id) => id !== checkboxId));
        setSelectedSubservicesServices(
          selectedSubservicesServices.filter((s) => s.name !== subservice.service)
        );
      } else {
        setSelectedCheckboxes([...selectedCheckboxes, checkboxId]);
        setSelectedSubservicesServices([
          ...selectedSubservicesServices,
          { name: subservice.service },
        ]);
      }
    }
  };

  const columns = [
    columnHelper.accessor(checkboxAccessor, {
      header: () => (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        ></div>
      ),
      meta: {
        headerClass: VendorListStyle.checkHeader,
      },
      id: "checkbox",
      enableColumnFilter: false,
      enableSorting: false,
      cell: ({ row }) => (
        <div
          className="d-flex justify-content-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            type="radio"
            name="assignRadio"
            className={VendorListStyle.checkbox}
            checked={row.original.select}
            // checked={selectedRow === row.original}
            onClick={(e) => {
              e.stopPropagation();
              handleRowSelection(row);
            }}
          />
        </div>
      ),
    }),
    columnHelper.accessor("name", {
      header: () => "Name",
      id: "name",
      cell: (info: any) => info.getValue(),
      enableSorting: true,
    }),

    columnHelper.accessor("assignmentsInHand", {
      header: () => "Assignments in Hand",
      id: "assignmentsInHand",
      cell: (info: any) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("itemsInHand", {
      header: () => "Items In Hand",
      cell: (info: any) => info.getValue(),
      enableSorting: true,
    }),

    // columnHelper.accessor("specializedCategories", {
    //   header: () => "Specialized Categories",
    //   cell: (info: any) => {
    //     const specializedCategories = info.getValue();
    //     return specializedCategories
    //       .map((category: any) => category.speciality)
    //       .join(", ");
    //   },
    //   enableSorting: true,
    // }),
    columnHelper.accessor("specializedCategories", {
      header: () => "Specialized Categories",
      id: "specializedCategories",
      cell: ({ row }) => {
        const categories = row.original.specializedCategories;
        const displayCategories = showAllCategories ? categories : categories.slice(0, 3);

        return (
          <div className={VendorListStyle.actionButtons}>
            {displayCategories.map((category: any) => (
              <span key={category.id}>{category.speciality}, </span>
            ))}
            {categories.length > 3 && (
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setShowAllCategories(!showAllCategories)}
              >
                {showAllCategories ? "Less" : "More"}
              </span>
            )}
          </div>
        );
      },
      enableSorting: true,
    }),
    columnHelper.accessor("shippingAddress.city", {
      header: () => "City",
      cell: (info: any) => info.getValue(),
      enableSorting: true,
    }),
  ];

  console.log("listData before", vendorInventoryListAPIData);

  const table = useReactTable({
    columns,
    data: vendorInventoryListAPIData as VendorData[],
    enableColumnFilters: false,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {vendorInventoryListAPIData && vendorInventoryListAPIData.length > 0 ? (
        <div className={VendorListStyle.addListTableContainer}>
          <CustomReactTable table={table} />
        </div>
      ) : (
        <p className="d-flex justify-content-center">Loading...</p>
      )}
      <div className="row mt-3">
        <label className={VendorListStyle.textAddStyle}>4) Services</label>
      </div>
      <div className="row mt-2">
        <div className="col-1" />
        <div className="col-md-2 col-sm-6 col-12">
          <label className={VendorListStyle.textAddStyle}>
            <span style={{ color: "red" }}>*</span> Service Needed
          </label>
        </div>
        <div className={`col-md-3 col-sm-6 col-12 ${VendorListStyle.selectContainer}`}>
          <GenericSelect
            placeholder="Select"
            // options={selectedServices}
            value={selectedValue}
            onChange={(selectedOption: any) => {
              setSelectedValue(selectedOption);
              handleServiceChange(selectedOption);
            }}
            options={selectedServices.map((service) => ({
              label: service.service,
              value: service.id,
            }))}
          />
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className={`col-md-10 col-sm-6 col-12 ${VendorListStyle.selectContainer}`}>
          <div className={VendorListStyle.checkboxContainer}>
            {selectedValue &&
              selectedSubservices.map((subservice) => (
                <div key={subservice.id} className={VendorListStyle.formCheck}>
                  <input
                    type="checkbox"
                    id={subservice.id}
                    checked={selectedCheckboxes.includes(subservice.id)}
                    onChange={() => handleCheckboxChange(subservice.id)}
                  />
                  <label className={VendorListStyle.formCheckLabel}>
                    {subservice.service}
                  </label>
                </div>
              ))}
          </div>
          {selectedValue && selectedSubservices && (
            <div className="col-md-4 col-sm-6 col-12">
              <label className={VendorListStyle.labelStyles}>
                Minimum Cost of Services:
                <span className={VendorListStyle.spanStyle}></span>
              </label>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  vendorInventoryListAPIData: state.addItemsTable.vendorInventoryListAPIData,
  CRN: selectCRN(state),
});

const mapDispatchToProps = {
  fetchVendorInventoryAction,
  updateVendorAssignmentPayload,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(VendorAssignListTable);
