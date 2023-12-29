import GenericBreadcrumb from "../common/GenericBreadcrumb";
import GenericComponentHeading from "../common/GenericComponentHeading";
import AllTasksStyle from "./AllTasks.module.scss";

const AllTasksComponent: React.FC = () => {
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
      name: "Tasks",
      path: "",
      active: true,
    },
  ];

  return (
    <div className="row">
      <div className={AllTasksStyle.stickyContainer}>
        <GenericBreadcrumb dataList={pathList} />
        <GenericComponentHeading
          customHeadingClassname={AllTasksStyle.headingContainer}
          customTitleClassname={AllTasksStyle.headingTxt}
          title="All Claim Tasks"
        />
      </div>
    </div>
  );
};

export default AllTasksComponent;
