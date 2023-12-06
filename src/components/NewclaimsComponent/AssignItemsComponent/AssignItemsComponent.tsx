"use client";
import React, { useState } from "react";
import GenericButton from "@/components/common/GenericButton";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import AssignItemsTableComponent from "./AssignItemsTableComponent/AssignItemsTableComponent";
import AssignItemsStyle from "./assignItemsComponent.module.scss";

function AssignItemsComponent() {
  const [isSbmitItemsDisabled, setSubmitItemsDisabled] = useState(true);
  return (
    <div>
      <div>
        <div className={`col-md-12 col-sm-12 col-12 ${AssignItemsStyle.addItemsTitle}`}>
          3) Assign Items
        </div>
        <div className="row justify-content-end mt-2">
          <div className="col-auto">
            <GenericButton
              label="Cancel"
              theme="lightBlue"
              size="small"
              type="submit"
              btnClassname={AssignItemsStyle.newClaimBtn}
            />
          </div>
          <div className="col-auto">
            <GenericButton
              label="Previous"
              theme="lightBlue"
              size="small"
              type="submit"
              btnClassname={AssignItemsStyle.newClaimBtn}
            />
          </div>
          <div className="col-auto">
            <GenericButton
              label="Submit"
              theme="lightBlue"
              size="small"
              type="submit"
              btnClassname={AssignItemsStyle.newClaimBtn}
              disabled={isSbmitItemsDisabled}
              onClick={() => {
                setSubmitItemsDisabled(true);
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <GenericComponentHeading
          title={"New Vendor Assignment"}
          customHeadingClassname={AssignItemsStyle.PolicyholderText}
          customTitleClassname={AssignItemsStyle.customTitleClassname}
        />
      </div>
      <div>
        <AssignItemsTableComponent />
      </div>
      <div className="row mt-3 justify-content-end">
        <div className="col-auto">
          <GenericButton
            label="Cancel"
            theme="lightBlue"
            size="small"
            type="submit"
            btnClassname={AssignItemsStyle.newClaimBtn}
          />
        </div>
        <div className="col-auto">
          <GenericButton
            label="Previous"
            theme="lightBlue"
            size="small"
            type="submit"
            btnClassname={AssignItemsStyle.newClaimBtn}
          />
        </div>
        <div className="col-auto">
          <GenericButton
            label="Submit"
            theme="lightBlue"
            size="small"
            type="submit"
            btnClassname={AssignItemsStyle.newClaimBtn}
            disabled={isSbmitItemsDisabled}
            onClick={() => {
              setSubmitItemsDisabled(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default AssignItemsComponent;
