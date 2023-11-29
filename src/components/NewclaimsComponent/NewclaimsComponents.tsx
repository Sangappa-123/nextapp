"use client";

import React from "react";
import Cards from "../common/Cards/index";
import { object, email, string, minLength } from "valibot";
import { useRouter } from "next/navigation";
import useCustomForm from "@/hooks/useCustomForm";
import NewClaimsStyle from "./newClaimStyle.module.scss";
import GenericComponentHeading from "../common/GenericComponentHeading/index";
import PolicyInformation from "../PolicyInformation/PolicyInformation";
import ClaimInformation from "../ClaimInformation/ClaimInformation";

function NewclaimsComponent() {
  const router = useRouter();
  const schema = object({
    // policy schema
    firstname: string("firstname", [
      minLength(1, "First name can contain only alphabets."),
    ]),
    lastname: string("lastname", [minLength(1, "Last name can contain only alphabets.")]),
    zipcode: string("zipcode.", [minLength(1, "Enter zip code.")]),
    // email: string(translate?.errorMsg?.email?.required, [
    //   minLength(1, translate?.errorMsg?.email?.required),
    //   email(translate?.errorMsg?.email?.invalid),
    // ]),
    email: string("email", [email("Please enter valid email.")]),
    mobilenumber: string("mobile number"),
    secondaryPhonenumber: string("secondary phone number"),
    address: string("Address"),
    address1: string("Address one"),
    address2: string("Address two"),
    state: object({
      label: string("Select Question", [minLength(1, "Select Question")]),
      value: string("Select Question"),
    }),
    // claim schema
    claim: string("Claim"),
    claimDate: string("Claim Date"),
    insuranceCompany: string("insurance company"),
    adjusterName: string("adjuster name"),
    claimDescription: string("claim description"),
    claimDeductible: string("claim deductible"),
    minItemPrice: string("Min Item Price"),
    taxRate: string("Tax Rate"),
    contentLimits: string("Content Limits"),
    lossType: object({
      label: string("Select Question", [minLength(1, "Select Question")]),
      value: string("Select Question"),
    }),
    homeOwnersPolicyType: object({
      label: string("Select Question", [minLength(1, "Select Question")]),
      value: string("Select Question"),
    }),
    // applyTax: string("yes"),
  });

  const { register, handleSubmit, formState, control } = useCustomForm(schema);
  const { errors } = formState;
  console.log("logss", errors);

  // const [show, setShow] = useState(false);

  const formSubmit = (data: any) => {
    console.log("data", data);
    // setShow(true);
  };
  const handleClick = () => {
    console.log("hwlllo");
    router.replace("/adjuster-dashboard");
  };

  const handleReset = () => {
    console.log("hwlllo");
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
            <PolicyInformation register={register} error={errors} control={control} />
          </div>
          <div>
            <GenericComponentHeading
              title={"Claim Information"}
              customHeadingClassname={NewClaimsStyle.PolicyholderText}
              customTitleClassname={NewClaimsStyle.customTitleClassname}
            />
            <ClaimInformation control={control} register={register} error={errors} />
          </div>
          <button className={NewClaimsStyle.cancelButton} onClick={handleClick}>
            Cancel
          </button>
          <button className={NewClaimsStyle.resetButton} onClick={handleReset}>
            Reset All
          </button>
          <button
            type="submit"
            className={NewClaimsStyle.saveButton}
            onClick={() => console.log("dataaa")}
          >
            Save & Next{" "}
          </button>
        </form>
      </Cards>
    </div>
  );
}

export default NewclaimsComponent;
