"use client";
import React from "react";
import OpenClaimTableStyle from "./UrgentClaimTable.module.scss";
import { connect } from "react-redux";
import { fetchUrgentClaimList } from "@/services/ClaimService";
import { convertToCurrentTimezone } from "@/utils/helper";
import GenericBreadcrumb from "@/components/common/GenericBreadcrumb/index";
import clsx from "clsx";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";

import ReactTable from "@/components/common/ReactTable/index";

// const urgentClaimdata = {
//   claimListData: [
//     {
//       claimNumber: "CLM11",
//       status: "3rd Party Vendor",
//       noOfItems: 1,
//       noOfItemsPriced: 0,
//       policyHoldersName: "Test, Nithya",
//       claimDate: "11-29-2023T13:25:23Z",
//       lastActive: "Howell Melissa changed the status of the claim to 3rd Party Vendor.",
//       lastUpdated: "11-29-2023T13:26:03Z",
//       statusNumber: 3,
//     },
//     {
//       claimNumber: "claimss",
//       status: "Created",
//       noOfItems: 0,
//       noOfItemsPriced: 0,
//       policyHoldersName: "Kk, Kk",
//       claimDate: "11-29-2023T07:07:40Z",
//       lastActive: "Howell Melissa Created a new claim claimss.",
//       lastUpdated: "11-29-2023T07:09:29Z",
//       statusNumber: 1,
//     },
//     {
//       claimNumber: "ClaimLatest",
//       status: "Created",
//       noOfItems: 0,
//       noOfItemsPriced: 0,
//       policyHoldersName: "Claim, New",
//       claimDate: "11-29-2023T06:27:38Z",
//       lastActive: "Howell Melissa Created a new claim ClaimLatest.",
//       lastUpdated: "11-29-2023T06:28:35Z",
//       statusNumber: 1,
//     },
//     {
//       claimNumber: "NewCLMContents",
//       status: "Work In Progress",
//       noOfItems: 1,
//       noOfItemsPriced: 0,
//       policyHoldersName: "Smith, Gracie",
//       claimDate: "11-29-2023T05:32:03Z",
//       lastActive: "Howell Melissa changed the status of the claim to Work In Progress.",
//       lastUpdated: "11-29-2023T05:35:52Z",
//       statusNumber: 2,
//     },
//     {
//       claimNumber: "1111",
//       status: "Created",
//       noOfItems: 0,
//       noOfItemsPriced: 0,
//       policyHoldersName: "Syz, S",
//       claimDate: "11-24-2023T07:51:35Z",
//       lastActive: "Howell Melissa Created a new claim 1111.",
//       lastUpdated: "11-24-2023T07:51:35Z",
//       statusNumber: 1,
//     },
//     {
//       claimNumber: "45656567676767677868",
//       status: "3rd Party Vendor",
//       noOfItems: 3,
//       noOfItemsPriced: 2,
//       policyHoldersName: "Rfgrg, Dfg",
//       claimDate: "11-24-2023T05:09:50Z",
//       lastActive: "Howell Melissa  has sent items for claim supervisor review",
//       lastUpdated: "11-24-2023T05:20:43Z",
//       statusNumber: 3,
//     },
//     {
//       claimNumber: "43243",
//       status: "Created",
//       noOfItems: 0,
//       noOfItemsPriced: 0,
//       policyHoldersName: "User, Tset",
//       claimDate: "11-23-2023T05:41:54Z",
//       lastActive: "Howell Melissa Created a new claim 43243.",
//       lastUpdated: "11-23-2023T05:41:55Z",
//       statusNumber: 1,
//     },
//     {
//       claimNumber: "01flow16112023",
//       status: "3rd Party Vendor",
//       noOfItems: 10,
//       noOfItemsPriced: 0,
//       policyHoldersName: "Kumar, Tushar",
//       claimDate: "11-16-2023T12:36:18Z",
//       lastActive: "",
//       lastUpdated: "11-17-2023T09:30:11Z",
//       statusNumber: 3,
//     },
//     {
//       claimNumber: "flow16112023",
//       status: "3rd Party Vendor",
//       noOfItems: 56,
//       noOfItemsPriced: 3,
//       policyHoldersName: "Smith, Gracie",
//       claimDate: "11-16-2023T11:10:28Z",
//       lastActive: "Invoice # IN-5733305256 was created by Cole, Sherri  Artigem Contents",
//       lastUpdated: "11-17-2023T14:22:58Z",
//       statusNumber: 3,
//     },
//     {
//       claimNumber: "TUCSONCLM01",
//       status: "3rd Party Vendor",
//       noOfItems: 1,
//       noOfItemsPriced: 0,
//       policyHoldersName: "Tucson, Glen",
//       claimDate: "11-16-2023T11:06:38Z",
//       lastActive: "Howell Melissa changed the status of the claim to 3rd Party Vendor.",
//       lastUpdated: "11-16-2023T11:07:45Z",
//       statusNumber: 3,
//     },
//     {
//       claimNumber: "clm16nov",
//       status: "Work In Progress",
//       noOfItems: 20,
//       noOfItemsPriced: 0,
//       policyHoldersName: "Sp, Sahana",
//       claimDate: "11-16-2023T11:05:47Z",
//       lastActive: "Howell Melissa changed the status of the claim to Work In Progress.",
//       lastUpdated: "11-16-2023T11:06:20Z",
//       statusNumber: 2,
//     },
//     {
//       claimNumber: "01CLM16112023",
//       status: "3rd Party Vendor",
//       noOfItems: 10,
//       noOfItemsPriced: 0,
//       policyHoldersName: "Smith, Gracie",
//       claimDate: "11-16-2023T10:31:12Z",
//       lastActive: "Howell Melissa changed the status of the claim to 3rd Party Vendor.",
//       lastUpdated: "11-16-2023T10:34:46Z",
//       statusNumber: 3,
//     },
//     {
//       claimNumber: "clm2000",
//       status: "3rd Party Vendor",
//       noOfItems: 6,
//       noOfItemsPriced: 0,
//       policyHoldersName: "Smith, Gracie",
//       claimDate: "11-16-2023T09:42:34Z",
//       lastActive: "Howell Melissa changed the status of the claim to 3rd Party Vendor.",
//       lastUpdated: "11-16-2023T10:15:45Z",
//       statusNumber: 3,
//     },
//     {
//       claimNumber: "CLM16112023",
//       status: "3rd Party Vendor",
//       noOfItems: 10,
//       noOfItemsPriced: 0,
//       policyHoldersName: "Smith, Gracie",
//       claimDate: "11-16-2023T09:29:19Z",
//       lastActive: "",
//       lastUpdated: "11-16-2023T10:25:22Z",
//       statusNumber: 3,
//     },
//     {
//       claimNumber: "2342342342",
//       status: "Created",
//       noOfItems: 0,
//       noOfItemsPriced: 0,
//       policyHoldersName: "Upadhyaya, Sushma",
//       claimDate: "11-16-2023T07:44:06Z",
//       lastActive: "Howell Melissa Created a new claim 2342342342.",
//       lastUpdated: "11-16-2023T07:44:07Z",
//       statusNumber: 1,
//     },
//     {
//       claimNumber: "CLM14112023",
//       status: "3rd Party Vendor",
//       noOfItems: 10,
//       noOfItemsPriced: 0,
//       policyHoldersName: "Smith, Gracie",
//       claimDate: "11-14-2023T06:50:21Z",
//       lastActive: "Howell Melissa changed the status of the claim to 3rd Party Vendor.",
//       lastUpdated: "11-14-2023T06:53:14Z",
//       statusNumber: 3,
//     },
//     {
//       claimNumber: "CLM9112024",
//       status: "3rd Party Vendor",
//       noOfItems: 10,
//       noOfItemsPriced: 3,
//       policyHoldersName: "Kumar, Avinash",
//       claimDate: "11-09-2023T15:20:52Z",
//       lastActive: "Quote# QUOT-KA-1699545430629 is CREATED",
//       lastUpdated: "11-09-2023T15:22:29Z",
//       statusNumber: 3,
//     },
//     {
//       claimNumber: "CLM9112023",
//       status: "3rd Party Vendor",
//       noOfItems: 27,
//       noOfItemsPriced: 9,
//       policyHoldersName: "Smith, Gracie",
//       claimDate: "11-09-2023T04:50:16Z",
//       lastActive: "Invoice # IN-3912263778 was created by Cole, Sherri  Artigem",
//       lastUpdated: "11-13-2023T18:35:03Z",
//       statusNumber: 3,
//     },
//     {
//       claimNumber: "clm08novb",
//       status: "3rd Party Vendor",
//       noOfItems: 20,
//       noOfItemsPriced: 2,
//       policyHoldersName: "Sp, Sahana",
//       claimDate: "11-08-2023T12:28:48Z",
//       lastActive: "Quote# QUOT-SS-1699446893909 is CREATED",
//       lastUpdated: "11-08-2023T12:33:45Z",
//       statusNumber: 3,
//     },
//     {
//       claimNumber: "02CLM7112023",
//       status: "3rd Party Vendor",
//       noOfItems: 5,
//       noOfItemsPriced: 3,
//       policyHoldersName: "Kumar, Avinash",
//       claimDate: "11-07-2023T17:03:28Z",
//       lastActive: "Invoice # IN-6710001481 was created by Cole, Sherri  Artigem",
//       lastUpdated: "11-07-2023T17:05:54Z",
//       statusNumber: 3,
//     },
//   ],
//   currentPageNumber: 1,
//   totalClaims: 172,
//   claimErrorMsg: "",
// };

const pathList = [
  {
    name: "Home",
    path: "/adjuster-dashboard",
  },
  {
    name: "Claims Exceeding Time limits",
    path: "/login",
    active: true,
  },
];

const UrgentClaimTable: React.FC = (props) => {
  console.log(props, "claim data......");
  // props = urgentClaimdata;

  const [claimResult, setClaimResult] = React.useState(props.claimListData);
  // const [loader, setLoader] = React.useState(true);

  const pageLimit = 20;

  type ClaimData = {
    claimNumber: string;
    status: string;
    contractedEndTime: string;
    noOfItems: number;
    policyHoldersName: string;
    claimDate: Date;
    elapsedTd: string;
    lastNote: string;
  };
  React.useEffect(() => {
    const defaultData: ClaimData[] = [...props.urgentClaimListData];
    setClaimResult([...defaultData]);
  }, [props.urgentClaimListData]);

  const columnHelper = createColumnHelper<ClaimData>();

  const columns = [
    columnHelper.accessor("claimNumber", {
      id: "Claim_Number",
      header: () => `Claim #`,
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor((row) => row.status, {
      id: "Status",
      cell: (status) => {
        return (
          <div style={{ width: "80px" }}>
            <span
              className={`badge badge-secondary 
                      ${status.getValue() === "Created" && "badge-info"}
                      ${status.getValue() === "3rd Party Vendor" && "badge-primaryCustom"}
                      ${status.getValue() === "Work In Progress" && "badge-warning"}
                      ${status.getValue() === "Supervisor Approval" && "badge-success"}
                      `}
            >
              {status.getValue() as React.ReactNode}
            </span>
          </div>
        );
      },
      header: () => <span>Status</span>,
      enableSorting: true,
      size: 100,
    }),
    columnHelper.accessor("contractedEndTime", {
      id: "Contracted_ET",
      header: () => <span>{`Contracted End Time`}</span>,
      enableSorting: true,
    }),
    columnHelper.accessor("noOfItems", {
      id: "itemNumber",
      header: () => `# of Items`,
      cell: (info) => info.renderValue(),
      enableSorting: true,
    }),

    columnHelper.accessor("policyHoldersName", {
      id: "Insured_Name",
      header: () => <span>{`PolicyHolder's Name`}</span>,
      enableSorting: true,
    }),
    columnHelper.accessor("claimDate", {
      id: "Create_Date",
      header: "Claim Date",
      cell: (info) => {
        const unixDate = Date.parse(info.renderValue().replace("T", " "));
        const formatedDate = convertToCurrentTimezone(unixDate, "MM/DD/YYYY h:mm A");
        return formatedDate;
      },
      enableSorting: true,
    }),
    columnHelper.accessor("elapsedTd", {
      header: "Elapsed Time Days",
      enableSorting: false,
    }),

    columnHelper.accessor("lastNote", {
      id: "Last_Note",
      header: () => <span>{`Last Note`}</span>,
      enableSorting: true,
      size: 450,
    }),
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: props.currentPageNumber - 1,
    pageSize: pageLimit,
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const handleSorting = async (sortingUpdater) => {
    props.setTableLoader(true);

    const newSortVal = sortingUpdater(sorting);
    setSorting(newSortVal);

    if (newSortVal.length > 0) {
      const orderBy = newSortVal[0].desc ? "desc" : "asc";
      const sortBy = newSortVal[0].id;
      const result = await fetchUrgentClaimList(1, pageLimit, sortBy, orderBy);
      if (result) {
        props.setTableLoader(false);
      }
    } else if (newSortVal.length === 0 && props.claimListData.length > 0) {
      const result = await fetchUrgentClaimList();
      if (result) {
        props.setTableLoader(false);
      }
    }
  };
  const handlePagination = async (updaterFunction) => {
    props.setTableLoader(true);

    const newPaginationValue = updaterFunction(pagination);
    setPagination(newPaginationValue);
    const pageNumber = newPaginationValue.pageIndex + 1;

    console.log("pageNumber ", pageNumber);
    if (sorting.length > 0) {
      const orderBy = sorting[0].desc ? "desc" : "asc";
      const sortBy = sorting[0].id;
      const result = await fetchUrgentClaimList(pageNumber, pageLimit, sortBy, orderBy);
      if (result) {
        props.setTableLoader(false);
      }
    } else if (sorting.length === 0 && props.claimListData.length > 0) {
      const result = await fetchUrgentClaimList(pageNumber);
      if (result) {
        props.setTableLoader(false);
      }
    }
  };

  const table = useReactTable({
    data: claimResult,
    columns,
    pageCount: Math.ceil(props.totalClaims / pageLimit),
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: handlePagination,
    onSortingChange: handleSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    manualSorting: true,
    manualPagination: true,
  });

  return (
    <div className="row">
      <div>
        <GenericBreadcrumb dataList={pathList} />
      </div>
      <hr className={OpenClaimTableStyle.divider} />
      <div
        className={clsx(
          "col-lg-12 col-md-12 col-12 m-2",
          OpenClaimTableStyle.tableHeading
        )}
      >
        <label>{"Claims Exceeding Time Limits (176)"}</label>
      </div>
      <div className={OpenClaimTableStyle.claimTableContainer}>
        <ReactTable
          table={table}
          totalDataCount={props.totalClaims}
          pageLimit={pageLimit}
          showStatusColor={true}
          loader={props.tableLoader}
          tableDataErrorMsg={props.claimErrorMsg}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ claimdata }) => ({
  claimListData: claimdata.urgentClaimListData,
  currentPageNumber: claimdata.currentPageNumber,
  totalClaims: claimdata.totalClaims,
  claimErrorMsg: claimdata.claimErrorMsg,
});
export default connect(mapStateToProps, null)(UrgentClaimTable);
