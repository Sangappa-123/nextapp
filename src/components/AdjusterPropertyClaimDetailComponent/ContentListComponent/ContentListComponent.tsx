import React from "react";
import ContentListTable from "./ContentListTable";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import ContentListComponentStyle from "./ContentListComponent.module.scss";
import GenericButton from "@/components/common/GenericButton/index";

function ContentListComponent() {
  return (
    <div className="row">
      <div className={`${ContentListComponentStyle.contentListHeaderContainer} mt-4`}>
        <GenericComponentHeading
          title={`Content List`}
          customHeadingClassname={ContentListComponentStyle.contentListHeader}
        />
      </div>
      <div className={ContentListComponentStyle.contentListContainer}>
        <div className={`row ${ContentListComponentStyle.contentListContentContainer}`}>
          <div className="col-md-7 col-sm-12 col-xs-12 col-lg-7 d-flex pl-0">
            <div className={ContentListComponentStyle.contentListButtonDiv}>
              <GenericButton
                label="Add Item"
                theme="lightBlue"
                size="small"
                type="submit"
                btnClassname={ContentListComponentStyle.contentListBtn}
              />
              <GenericButton
                label="Create Assignment"
                theme="lightBlue"
                size="small"
                type="submit"
                btnClassname={ContentListComponentStyle.contentListBtn}
                disabled={true}
              />
              <GenericButton
                label="Map Receipts"
                theme="lightBlue"
                size="small"
                type="submit"
                btnClassname={ContentListComponentStyle.contentListBtn}
              />
              <GenericButton
                label="More"
                theme="lightBlue"
                size="small"
                type="submit"
                btnClassname={ContentListComponentStyle.contentListBtn}
                disabled={true}
              />
              <GenericButton
                label="Accept Min. Values"
                theme="lightBlue"
                size="small"
                type="submit"
                btnClassname={ContentListComponentStyle.contentListBtn}
              />
              <GenericButton
                label="Accept Standerd Cost"
                theme="lightBlue"
                size="small"
                type="submit"
                btnClassname={ContentListComponentStyle.contentListBtn}
              />
            </div>
          </div>

          <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12"></div>
        </div>
      </div>
      <ContentListTable />
    </div>
  );
}
export default ContentListComponent;
