import GenericBreadcrumb from "../common/GenericBreadcrumb";
import GenericComponentHeading from "../common/GenericComponentHeading";
import AllNotesStyle from "./AllNotes.module.scss";

const AllNotesComponent: React.FC = () => {
  const pathList = [
    {
      name: "Home",
      path: "/adjuster-dashboard",
      // active: true,
    },
    {
      name: "055CLM5122023Avi",
      path: "",
      active: true,
    },
    {
      name: "Message",
      path: "",
      active: true,
    },
  ];

  return (
    <div className="row">
      <div className={AllNotesStyle.stickyContainer}>
        <GenericBreadcrumb dataList={pathList} />
        <GenericComponentHeading
          customHeadingClassname={AllNotesStyle.headingContainer}
          customTitleClassname={AllNotesStyle.headingTxt}
          title="All Claim Messages"
        />
      </div>
    </div>
  );
};

export default AllNotesComponent;
