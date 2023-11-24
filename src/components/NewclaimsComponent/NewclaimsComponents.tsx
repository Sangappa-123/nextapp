"use client";

import React, { useState } from "react";
import Cards from "../common/Cards/index";
import { object, string, minLength } from "valibot";
import useCustomForm from "@/hooks/useCustomForm";
import NewClaimsStyle from "./newClaimStyle.module.scss";
import GenericComponentHeading from "../common/GenericComponentHeading/index";
import PolicyInformation from "../PolicyInformation/PolicyInformation";
import ClaimInformation from "../ClaimInformation/ClaimInformation";

function NewclaimsComponent() {
  const schema = object({
    firstname: string("Your email must be a string.", [
      minLength(1, "First name can contain only alphabets."),
    ]),
    lastname: string("Your email must be a string.", [
      minLength(1, "Last name can contain only alphabets."),
    ]),
    zipcode: string("Your email must be a string.", [minLength(1, "Enter zip code.")]),
  });

  const { register, handleSubmit, formState } = useCustomForm(schema);
  const { errors } = formState;

  const setShow = useState(false);

  const formSubmit = (data: any) => {
    console.log("data", data);
    setShow(true);
  };
  return (
    <div>
      <Cards className={NewClaimsStyle.cards}>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className={NewClaimsStyle.informationTab}>
            <p className={NewClaimsStyle.claimText}> 1) Claim and Policy Information </p>
          </div>
          <button className={NewClaimsStyle.cancelButton}>Cancel</button>
          <button className={NewClaimsStyle.resetButton}>Reset All</button>
          <button className={NewClaimsStyle.saveButton}>Save & Next </button>
          <div>
            <GenericComponentHeading
              title={"Policyholder Information"}
              customHeadingClassname={NewClaimsStyle.PolicyholderText}
              customTitleClassname={NewClaimsStyle.customTitleClassname}
            />
            <PolicyInformation register={register} error={errors} />
          </div>
          <div>
            <GenericComponentHeading
              title={"Claim Information"}
              customHeadingClassname={NewClaimsStyle.PolicyholderText}
              customTitleClassname={NewClaimsStyle.customTitleClassname}
            />
            <ClaimInformation />
          </div>
          <button className={NewClaimsStyle.cancelButton}>Cancel</button>
          <button className={NewClaimsStyle.resetButton}>Reset All</button>
          <button className={NewClaimsStyle.saveButton}>Save & Next </button>
        </form>
      </Cards>
    </div>
  );
}

export default NewclaimsComponent;
