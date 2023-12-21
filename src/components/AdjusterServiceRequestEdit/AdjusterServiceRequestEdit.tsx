"use client";
// import CustomLoader from "../common/CustomLoader/index";
import GenericBreadcrumb from "../common/GenericBreadcrumb";
import GenericComponentHeading from "../common/GenericComponentHeading/index";

type propsTypes = {
  serviceRequestId: string;
};

const AdjusterServiceRequestEdit: React.FC<propsTypes> = ({ serviceRequestId }) => {
  const claimId = sessionStorage.getItem("claimId") || "";
  const claimNumber = sessionStorage.getItem("claimNumber") || "";

  const pathList = [
    {
      name: "Home",
      path: "/adjuster-dashboard",
      // active: true,
    },
    {
      name: claimNumber,
      path: `/adjuster-property-claim-details/${claimId}`,
    },

    {
      name: serviceRequestId,
      path: "/adjuster-service-request-edit",
      active: true,
    },
  ];

  return (
    <div className="row">
      <GenericBreadcrumb dataList={pathList} />
      <div className="p-3">
        <GenericComponentHeading
          customTitleClassname="mt-2"
          title="New Construction - Residential Inspection"
        />
      </div>
    </div>
  );
  // return <CustomLoader />;
};
export default AdjusterServiceRequestEdit;
