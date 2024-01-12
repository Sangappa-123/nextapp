"use client";
import React, { useState, useEffect } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import CustomReactTable from "@/components/common/CustomReactTable";
import VendorListStyle from "./vendorAssignListTable.module.scss";
import GenericSelect from "@/components/common/GenericSelect";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "@/store/store";
import { fetchVendorInventoryAction } from "@/reducers/UploadCSV/AddItemsTableCSVSlice";

interface VendorItemsTableProps {
  vendorInventoryListAPIData: Array<object>;
  fetchVendorInventoryAction: any;
}

const VendorAssignListTable: React.FC<connectorType> = (props: VendorItemsTableProps) => {
  const { fetchVendorInventoryAction, vendorInventoryListAPIData } = props;
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    fetchVendorInventoryAction({
      pageNo: 1,
      recordPerPage: 10,
    });
  }, [fetchVendorInventoryAction, vendorInventoryListAPIData]);

  type Address = {
    city: string;
    completeAddress: string;
  };

  type SpecializedCategory = {
    id: number;
    speciality: string;
    noOfItems: number;
  };

  type VendorData = {
    select: boolean;
    name: string;
    assignmentsInHand: number;
    itemsInHand: number;
    specializedCategories: SpecializedCategory[];
    shippingAddress: Address;
  };

  const columnHelper = createColumnHelper<VendorData>();
  const checkboxAccessor = (data: VendorData) => data.select;

  const columns = [
    columnHelper.accessor(checkboxAccessor, {
      meta: {
        headerClass: VendorListStyle.checkHeader,
      },
      id: "radio",
      enableColumnFilter: false,
      enableSorting: false,
      cell: () => (
        <div
          className="d-flex justify-content-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input type="radio" className={VendorListStyle.checkbox} />
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

  console.log("listData before useReactTable:", vendorInventoryListAPIData);

  const table = useReactTable({
    columns,
    data: vendorInventoryListAPIData as VendorData[],
    enableColumnFilters: false,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    console.log("table data within CustomReactTable:", table);
  }, [table]);

  return (
    <>
      {vendorInventoryListAPIData && vendorInventoryListAPIData.length > 0 ? (
        <div className={VendorListStyle.addListTableContainer}>
          <CustomReactTable table={table} />
        </div>
      ) : (
        <p>Loading...</p>
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
          <GenericSelect placeholder="Select" hideSelectedOptions={false} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  vendorInventoryListAPIData: state.addItemsTable.vendorInventoryListAPIData,
});

const mapDispatchToProps = {
  fetchVendorInventoryAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(VendorAssignListTable);
