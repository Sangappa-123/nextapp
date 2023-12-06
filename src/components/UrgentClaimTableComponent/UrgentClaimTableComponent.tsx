"use client";
import React, { useEffect } from "react";
import UrgentClaimSearchBox from "./UrgentClaimSearchBox/UrgentClaimSearchBox";
import UrgentClaimTablecomStyle from "./UrgentClaimTableComponent.module.scss";
import UrgentClaimTable from "./UrgentClaimTable/index";
import { connect } from "react-redux";
import { addUrgentClaimListData } from "@/reducers/UrgentClaimData/UrgentClaimSlice";
import { RootState } from "@/store/store";
import { unknownObjectType } from "@/constants/customTypes";

interface typedProp {
  initData: unknownObjectType | null;
}

function UrgentClaimTableComponent(props: typedProp): React.ReactNode {
  const { initData, addUrgentClaimListData, urgentClaimListData } = props;
  console.log("checking props", urgentClaimListData);

  //   const [loading, setLoading] = useState(true);
  const [tableLoader, setTableLoader] = React.useState(false);

  useEffect(() => {
    addUrgentClaimListData(initData);
  }, [addUrgentClaimListData, initData]);
  //   React.useEffect(() => {
  //     setLoading(false);
  //     const claimData = props.urgentClaimListRes.result;
  //     props.addUrgentClaimListData({ claimData });
  //   }, []);

  // if (loading) {
  //   return null;
  // }
  return (
    <>
      <div className="mt-4">{/* <OpenClaimsText /> */}</div>
      <div className={UrgentClaimTablecomStyle.claimContainer}>
        <div className={`row ${UrgentClaimTablecomStyle.claimContentContainer}`}>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12 d-flex">
            {/* <NewClaimButton /> */}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12 mt-2 mb-2">
            {/* <OpenClaimSelectDropdown setTableLoader={setTableLoader} /> */}
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <UrgentClaimSearchBox setTableLoader={setTableLoader} />
          </div>
        </div>
      </div>

      <div className="row">
        <UrgentClaimTable setTableLoader={setTableLoader} tableLoader={tableLoader} />
      </div>
    </>
  );
}
const mapStateToProps = ({ urgentclaimdata: { urgentClaimListData } }: RootState) => ({
  urgentClaimListData,
});

const mapDispatchToProps = {
  addUrgentClaimListData,
};
export default connect(mapStateToProps, mapDispatchToProps)(UrgentClaimTableComponent);
