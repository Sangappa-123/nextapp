"use client";
import React, { useEffect } from "react";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import CustomReactTable from "@/components/common/CustomReactTable/index";
import PolicyHolderTableListStyle from "./policyholderpayouts.module.scss";
import { connect } from "react-redux";
import { RootState } from "@/store/store";
import { fetchPolicySummaryTableAction } from "@/reducers/ContentsEvaluation/DetailedInventorySlice";
import GenericComponentHeading from "@/components/common/GenericComponentHeading/index";
import { contentsEvaluationTranslateType } from "@/translations/contentsEvaluationTranslate/en";
import useTranslation from "@/hooks/useTranslation";
import CustomLoader from "@/components/common/CustomLoader/index";

type PolicyHolderTableProps = {
  listData: any;
  fetchPolicySummaryTableAction: any;
};

interface policyHolderData {
  [key: string | number]: any;
}

function PolicyHolderTable(props: PolicyHolderTableProps) {
  const columnHelper = createColumnHelper<policyHolderData>();
  const { listData, fetchPolicySummaryTableAction } = props;

  const claimNumber = sessionStorage.getItem("claimNumber") || "";
  const {
    loading,
    translate,
  }: { loading: boolean; translate: contentsEvaluationTranslateType | undefined } =
    useTranslation("contentsEvaluationTranslate");
  useEffect(() => {
    fetchPolicySummaryTableAction({
      claimNumber: claimNumber,
    });
  }, [claimNumber, fetchPolicySummaryTableAction]);

  const columns = [
    columnHelper.accessor("paymentID", {
      cell: (info: any) => info.getValue(),
      header: () => translate?.policyholderPayouts?.columns.paymentId,
      footer: () => <span>{translate?.policyholderPayouts?.columns.totalPaid} </span>,
    }),
    columnHelper.accessor("amountPaid", {
      cell: (info: any) => (
        <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>
      ),
      header: () => translate?.policyholderPayouts?.columns.paymentAmount,
      footer: () => <span>$0.00</span>,
    }),
    columnHelper.accessor("paymentDate", {
      cell: (info: any) => (
        <span>{`$${Number.parseFloat(info.getValue()).toFixed(2)}`}</span>
      ),
      header: () => translate?.policyholderPayouts?.columns.paymentDate,
    }),
    columnHelper.accessor("paymentMode", {
      cell: (info: any) => info.getValue(),
      header: () => translate?.policyholderPayouts?.columns.paymentMode,
    }),
    columnHelper.accessor("referenceNumber", {
      cell: (info: any) => info.getValue(),
      header: () => translate?.policyholderPayouts?.columns.referenceCheck,
    }),
    columnHelper.accessor("note", {
      cell: (info: any) => <span>{info.getValue()}</span>,
      header: () => translate?.policyholderPayouts?.columns.note,
    }),
  ];
  const table = useReactTable({
    data: listData?.paymentSummaryDetails,
    columns,
    pageCount: 20,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    manualSorting: true,
    manualPagination: true,
    enableSorting: true,
    enableColumnFilters: false,
  });
  if (loading) {
    return (
      <div className="col-12 d-flex flex-column position-relative">
        <CustomLoader loaderType="spinner2" />
      </div>
    );
  }
  return (
    <div>
      <GenericComponentHeading
        title={translate?.policyholderPayouts?.title}
        customHeadingClassname={PolicyHolderTableListStyle.policyHolderListHeader}
      />
      <div className={PolicyHolderTableListStyle.detailListContainer}>
        <div
          className={`row col-12 ${PolicyHolderTableListStyle.detailListContentContainer}`}
        ></div>
      </div>
      {listData?.paymentSummaryDetails && (
        <div>
          <CustomReactTable
            showFooter={true}
            tableDataErrorMsg={
              listData?.paymentSummaryDetails.length === 0 &&
              translate?.detailedInventory?.noRecords
            }
            table={table}
          />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  listData: state.detailedInventorydata?.policySummaryListDataFull,
});

const mapDispatchToProps = {
  fetchPolicySummaryTableAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PolicyHolderTable);
