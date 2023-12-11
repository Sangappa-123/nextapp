import Cards from "@/components/common/Cards";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import NoRecordComponent from "@/components/common/NoRecordComponent/NoRecordComponent";
import Link from "next/link";
import PolicyHolderCradStyle from "./PolicyHolderCard.module.scss";

const PolicyHoldersComponent: React.FC = () => {
  return (
    <>
      <Cards className={PolicyHolderCradStyle.policyHolderCradContainer}>
        <GenericComponentHeading title="Policyholder's Task" />
        <div>
          <NoRecordComponent message="No task available" />
        </div>
        <div className="text-right">
          <Link href="#">View all</Link>
        </div>
      </Cards>
    </>
  );
};
export default PolicyHoldersComponent;
