import AssignmentInfo from "./AssignmentInfo/AssignmentInfo";
import AssignmentRecord from "./AssignmentRecord/AssignmentRecord";
import GenericComponentHeading from "@/components/common/GenericComponentHeading/index";
import assignmentDetailsStyle from "./assignmentDetails.module.scss";
import AssignmentGraph from "./AssignmentGraph/AssignmentGraph";
import AssignmentContentList from "./AssignmentContentList/AssignmentContentList";

const AssignmentDetails: React.FC = () => {
  return (
    <>
      <GenericComponentHeading title="Asssignment#  -  EC6FED038037"></GenericComponentHeading>
      <div className={assignmentDetailsStyle.container}>
        <AssignmentInfo />
        <AssignmentRecord />
        <AssignmentGraph />
      </div>
      <AssignmentContentList />
    </>
  );
};
export default AssignmentDetails;
