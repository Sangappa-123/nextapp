"use client";
// import CustomLoader from "../common/CustomLoader/index";
import GenericBreadcrumb from "../common/GenericBreadcrumb";
import GenericComponentHeading from "../common/GenericComponentHeading/index";

type propsTypes = {
  claimId: string;
};

const AdjusterServiceRequest: React.FC<propsTypes> = ({ claimId }) => {
  const claimNumber = sessionStorage.getItem("claimNumber") || "claimNumber";

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
      name: " New Service Request",
      path: "/adjuster-service-request",
      active: true,
    },
  ];

  return (
    <div className="row">
      <GenericBreadcrumb dataList={pathList} />
      <div className="p-3">
        <GenericComponentHeading
          customTitleClassname="mt-2"
          title="New Service Request"
        />
      </div>
    </div>
  );
  // return <CustomLoader />;
};
export default AdjusterServiceRequest;
