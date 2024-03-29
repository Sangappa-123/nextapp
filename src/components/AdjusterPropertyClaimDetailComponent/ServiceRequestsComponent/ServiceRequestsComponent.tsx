"use client";
import React from "react";
import ServiceRequestTable from "./ServiceRequestTable/ServiceRequestTable";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import ServiceRequestComponentStyle from "./ServiceRequestsComponent.module.scss";
import GenericButton from "@/components/common/GenericButton/index";
import ServiceRequestSearchBox from "./ServiceRequestSearchBox/ServiceRequestSearchBox";
import { useParams, useRouter } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";
import { serviceRequestComponentType } from "@/translations/serviceRequestComponent/en";

const ServiceRequestsComponent: React.FC = () => {
  const router = useRouter();
  const { claimId }: { claimId: string } = useParams();

  const [tableLoader, setTableLoader] = React.useState<boolean>(false);

  const handleNewServiceRequest = () => {
    router.push(`/adjuster-service-request/${claimId}`);
  };
  const {
    translate,
    loading,
  }: { translate: serviceRequestComponentType | undefined; loading: boolean } =
    useTranslation("serviceRequestComponent");
  if (loading) {
    return null;
  }
  return (
    <div className="row">
      <div className={`${ServiceRequestComponentStyle.serviceHeaderContainer} mt-4`}>
        <GenericComponentHeading
          title={translate?.serviceRequestHeading ?? ""}
          customHeadingClassname={ServiceRequestComponentStyle.serviceHeader}
        />
      </div>
      <div className={ServiceRequestComponentStyle.serviceRequestContainer}>
        <div
          className={`row ${ServiceRequestComponentStyle.serviceRequestContentContainer}`}
        >
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex ps-0 align-items-center">
            <div className={ServiceRequestComponentStyle.newClaimButton}>
              <GenericButton
                label={translate?.newServiceRequest ?? ""}
                theme="normal"
                size="small"
                type="submit"
                btnClassname={ServiceRequestComponentStyle.newServiceRequestBtn}
                onClickHandler={handleNewServiceRequest}
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-12 align-items-center">
            <ServiceRequestSearchBox setTableLoader={setTableLoader} />
          </div>
        </div>
      </div>
      <ServiceRequestTable
        setTableLoader={setTableLoader}
        tableLoader={tableLoader}
        translate={translate}
      />
    </div>
  );
};
export default ServiceRequestsComponent;
