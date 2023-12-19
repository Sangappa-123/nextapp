"use client";
// import CustomLoader from "../common/CustomLoader/index";
import GenericBreadcrumb from "../common/GenericBreadcrumb";

type propsTypes = {
  serviceRequestId: string;
};

const AdjusterAssignServiceRequestComponent: React.FC<propsTypes> = ({
  serviceRequestId,
}) => {
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
    },

    {
      name: "Assign service request",
      path: `/adjuster-assign-service-request/${serviceRequestId}`,
      active: true,
    },
  ];

  return (
    <div className="row">
      <GenericBreadcrumb dataList={pathList} />
    </div>
  );
  // return <CustomLoader />;
};
export default AdjusterAssignServiceRequestComponent;
