"use client";
import React, { useState } from "react";
import OpenClaimsText from "./OpenClaimsText";
import NewClaimButton from "./NewClaimButton";
import OpenClaimSelectDropdown from "./OpenClaimSelectDropdown";
import OpenClaimsSearchBox from "./OpenClaimsSearchBox/OpenClaimsSearchBox";
import OpenClaimsComponentStyleTable from "./OpenClaimsTableComponent.module.scss";
import OpenClaimTable from "./OpenClaimTable/index";
import { connect } from "react-redux";
import { addClaimListData } from "@/reducers/ClaimData/ClaimSlice";

function OpenClaimsTableComponent(props): React.ReactNode {
  const [loading, setLoading] = useState(true);
  const [tableLoader, setTableLoader] = React.useState(false);

  React.useEffect(() => {
    setLoading(false);
    const claimData = props.claimListRes.result;
    props.addClaimListData({ claimData });
  }, []);

  if (loading) {
    return null;
  }
  return (
    <>
      <div className="mt-4">
        <OpenClaimsText />
      </div>
      <div className={OpenClaimsComponentStyleTable.claimContainer}>
        <div className={`row ${OpenClaimsComponentStyleTable.claimContentContainer}`}>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <NewClaimButton />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12 mt-2 mb-2">
            <OpenClaimSelectDropdown setTableLoader={setTableLoader} />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <OpenClaimsSearchBox setTableLoader={setTableLoader} />
          </div>
        </div>
      </div>

      <div className="row">
        <OpenClaimTable setTableLoader={setTableLoader} tableLoader={tableLoader} />
      </div>
    </>
  );
}
const mapDispatchToProps = {
  addClaimListData,
};
export default connect(null, mapDispatchToProps)(OpenClaimsTableComponent);
