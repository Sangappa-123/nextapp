"use client";
import React from "react";
import ServiceRequestTable from "./ServiceRequestTable/ServiceRequestTable";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import ServiceRequestComponentStyle from "./ServiceRequestsComponent.module.scss";
import GenericButton from "@/components/common/GenericButton/index";
import { connect } from "react-redux";
import { addserviceRequestData } from "@/reducers/ClaimData/ClaimServiceRequestSlice";

function ServiceRequestsComponent(props: any) {
  const { serviceRequestListRes } = props;
  React.useEffect(() => {
    const claimServiceRequestList = serviceRequestListRes.result;

    props.addserviceRequestData({ claimServiceRequestList });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [tableLoader, setTableLoader] = React.useState<boolean>(false);

  return (
    <div className="row">
      <div className={`${ServiceRequestComponentStyle.serviceHeaderContainer} mt-4`}>
        <GenericComponentHeading
          title="Service Requests"
          customHeadingClassname={ServiceRequestComponentStyle.serviceHeader}
        />
      </div>
      <div className={ServiceRequestComponentStyle.serviceRequestContainer}>
        <div
          className={`row ${ServiceRequestComponentStyle.serviceRequestContentContainer}`}
        >
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex ps-0">
            <div className={ServiceRequestComponentStyle.newClaimButton}>
              <GenericButton
                label="New Service Request"
                theme="normal"
                size="small"
                type="submit"
                btnClassname={ServiceRequestComponentStyle.newServiceRequestBtn}
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-12"></div>
        </div>
      </div>
      <ServiceRequestTable setTableLoader={setTableLoader} tableLoader={tableLoader} />
    </div>
  );
}
const mapDispatchToProps = {
  addserviceRequestData,
};
export default connect(null, mapDispatchToProps)(ServiceRequestsComponent);
