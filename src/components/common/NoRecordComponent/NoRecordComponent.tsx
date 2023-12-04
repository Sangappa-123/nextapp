import NoRecordStyle from "./no-record.module.scss";

type NoRecordType = {
  message: string;
};

const NoRecordComponent: React.FC<NoRecordType> = (props) => {
  return <div className={NoRecordStyle.noRecordContent}>{props.message}</div>;
};

export default NoRecordComponent;
