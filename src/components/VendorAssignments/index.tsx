import TabsButtonComponent from "@/components/common/TabsButtonComponent";
import style from "./index.module.scss";
import Assignments from "./Assignments/Assignments";

const VendorAssignments: React.FC = () => {
  const tabsArray = [
    {
      name: "Assignments",
      content: <Assignments />,
    },
    {
      name: "Quote By Assignments",
      content: "",
    },
    {
      name: "Invoices",
      content: "",
    },
  ];

  return (
    <div className={style.vendorCont}>
      <TabsButtonComponent tabData={tabsArray} />
    </div>
  );
};
export default VendorAssignments;
