import React from "react";
import OpenClaimsText from "./OpenClaimsText";
import NewClaimButton from "./NewClaimButton";
import OpenClaimSelectDropdown from "./OpenClaimSelectDropdown";
import OpenClaimsSearchBox from "./OpenClaimsSearchBox/OpenClaimsSearchBox";
import OpenClaimsComponentStyleTable from "./OpenClaimsTableComponent.module.scss";
import OpenClaimTable from "./OpenClaimTable/index";
import { fetchClaimList } from "@/services/ClaimService";

function OpenClaimsTableComponent(): React.ReactNode {
  const result = fetchClaimList();
  const { data = [], error }: any = result;
  if (!error && data) {
    console.log("Success");
  }
  return (
    <>
      <div className="mt-4">
        <OpenClaimsText />
      </div>
      <div className={OpenClaimsComponentStyleTable.claimContainer}>
        <div className={`row ${OpenClaimsComponentStyleTable.claimContentContainer}`}>
          <div className="col-lg-3 col-md-4 col-sm-12 d-flex align-items-center">
            <NewClaimButton />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-12 d-flex align-items-center offset-md-0 offset-lg-2">
            <OpenClaimSelectDropdown />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 d-flex align-items-center">
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
export default OpenClaimsTableComponent;
