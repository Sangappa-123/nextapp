"use client";
import React from "react";
import OpenClaimsText from "./OpenClaimsText";
import NewClaimButton from "./NewClaimButton";
import OpenClaimSelectDropdown from "./OpenClaimSelectDropdown";
import OpenClaimsSearchBox from "./OpenClaimsSearchBox/OpenClaimsSearchBox";
import OpenClaimsComponentStyleTable from "./OpenClaimsTableComponent.module.scss";
import OpenClaimTable from "./OpenClaimTable/index";
import { connect } from "react-redux";
import { addClaimListData } from "@/reducers/ClaimData/ClaimSlice";

function OpenClaimsTableComponent(props): React.ReactNode {
  React.useEffect(() => {
    const claimData = props.claimListRes.result.data;
    props.addClaimListData({ claimData });
  }, []);
  return (
    <>
      <div className="mt-4">
        <OpenClaimsText />
      </div>
      <div className={OpenClaimsComponentStyleTable.claimContainer}>
        <div className={`row ${OpenClaimsComponentStyleTable.claimContentContainer}`}>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12 mt-2">
            <NewClaimButton />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12 mt-2">
            <OpenClaimSelectDropdown />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12 mt-2">
            <OpenClaimsSearchBox />
          </div>
        </div>
      </div>

      <div className="row">
        <OpenClaimTable />
      </div>
    </>
  );
}
const mapDispatchToProps = {
  addClaimListData,
};
export default connect(null, mapDispatchToProps)(OpenClaimsTableComponent);
