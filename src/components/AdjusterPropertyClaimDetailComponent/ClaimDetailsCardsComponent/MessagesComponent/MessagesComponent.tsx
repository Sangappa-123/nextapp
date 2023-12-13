import Cards from "@/components/common/Cards";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import NoRecordComponent from "@/components/common/NoRecordComponent/NoRecordComponent";
import Link from "next/link";
import MessageCardStyle from "./MessagesCrad.module.scss";

const MessagesComponent: React.FC = () => {
  return (
    <>
      <Cards className={MessageCardStyle.messageCradContainer}>
        <GenericComponentHeading title="Messages" />
        <div className={MessageCardStyle.messageListContainer}>
          <NoRecordComponent message="No New Message" />
        </div>
        <div className="text-right">
          <Link href="#">View all messages</Link>
        </div>
      </Cards>
    </>
  );
};
export default MessagesComponent;
