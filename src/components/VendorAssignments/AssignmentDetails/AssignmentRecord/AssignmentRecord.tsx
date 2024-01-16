import assignmentDetailsStyle from "../assignmentDetails.module.scss";
import Cards from "@/components/common/Cards/index";
import GenericComponentHeading from "@/components/common/GenericComponentHeading/index";

const AssignmentRecord: React.FC = () => {
  return (
    <>
      <Cards className={assignmentDetailsStyle.snapShotcardContainer}>
        <Cards className={assignmentDetailsStyle.snapShotcardContainer}>
          <GenericComponentHeading title="Replacement Quote"></GenericComponentHeading>
          <div className="col-md-12">
            <span className="text-danger">No Records found</span>
          </div>
        </Cards>
        <Cards className={assignmentDetailsStyle.snapShotcardContainer}>
          <GenericComponentHeading title="Vendor Invoices"></GenericComponentHeading>
          <div className="col-md-12">
            <span className="text-danger">No Records found</span>
          </div>
        </Cards>
        <Cards className={assignmentDetailsStyle.snapShotcardContainer}>
          <GenericComponentHeading title="Vendor Team"></GenericComponentHeading>
          <div className="col-md-12">
            <span className="text-danger">No Records found</span>
          </div>
        </Cards>
      </Cards>
    </>
  );
};
export default AssignmentRecord;
