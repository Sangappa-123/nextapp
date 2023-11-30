"use client";
import React, { useState } from "react";
import GenericButton from "@/components/common/GenericButton";
import GenericComponentHeading from "@/components/common/GenericComponentHeading";
import AddStyle from "./addItemsComponent.module.scss";

interface AddItemsComponentProps {
  onAssignItemsClick: () => void;
}

function AddItemsComponent({ onAssignItemsClick }: AddItemsComponentProps) {
  const [isAssignItemsDisabled, setAssignItemsDisabled] = useState(true);
  return (
    <div>
      <div>
        <div className={`col-md-12 col-sm-12 col-12 ${AddStyle.addItemsTitle}`}>
          2) Add Items
        </div>
        <div className="row justify-content-end mt-2">
          <div className="col-auto">
            <button className={AddStyle.cancelButton}>Cancel</button>
          </div>
          <div className="col-auto">
            <GenericButton
              label="Previous"
              theme="normal"
              type="submit"
              btnClassname={AddStyle.newClaimBtn}
            />
          </div>
          <div className="col-auto">
            <GenericButton
              label="Assign Items"
              theme="normal"
              type="submit"
              btnClassname={AddStyle.newClaimBtn}
              disabled={isAssignItemsDisabled}
              onClick={() => {
                setAssignItemsDisabled(true);
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <GenericComponentHeading
          title={"Add Items"}
          customHeadingClassname={AddStyle.PolicyholderText}
          customTitleClassname={AddStyle.customTitleClassname}
        />
      </div>
      <div>
        <button onClick={onAssignItemsClick}>Assign Items</button>
      </div>
    </div>
  );
}

export default AddItemsComponent;
