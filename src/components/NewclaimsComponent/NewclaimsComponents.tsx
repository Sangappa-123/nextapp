"use client";

import React, { useState } from "react";
import Cards from "../common/Cards/index";
import { object, email, string, minLength } from "valibot";
import { useRouter } from "next/navigation";
import useCustomForm from "@/hooks/useCustomForm";
import NewClaimsStyle from "./newClaimStyle.module.scss";
import GenericComponentHeading from "../common/GenericComponentHeading/index";
import PolicyInformation from "../PolicyInformation/PolicyInformation";
import ClaimInformation from "../ClaimInformation/ClaimInformation";
import AddItemsComponent from "./AddItemsComponent";
import AssignItemsComponent from "./AssignItemsComponent";
import NewClaimWizardFormArrow from "../NewClaimWizardFormArrow";
import GenericButton from "../common/GenericButton/index";

function NewclaimsComponent() {
  const [activeSection, setActiveSection] = useState(0);
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

  const formSubmit = async (data: any) => {
    try {
      console.log("data", data);
      setActiveSection((prev) => prev + 1);
    } catch (error) {
      console.error("Error submitting", error);
    }
  };

  const handleClick = () => {
    console.log("hwlllo");
    router.replace("/adjuster-dashboard");
  };

  const handleReset = () => {
    console.log("hwlllo");
  };

  const handleSectionClick = (index: number) => {
    if (index === activeSection) {
      setActiveSection(index);
    }
  };

  const handleAssignItemsClick = () => {
    setActiveSection(2);
  };

  return (
    <div>
      <div className="mb-3">
        <NewClaimWizardFormArrow
          activeSection={activeSection}
          handleSectionClick={handleSectionClick}
        />
      </div>
      {activeSection === 0 && (
        <Cards className={NewClaimsStyle.cards}>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className={NewClaimsStyle.informationTab}>
              <p className={NewClaimsStyle.claimText}>
                {" "}
                1) Claim and Policy Information{" "}
              </p>
            </div>
            <div className="row justify-content-end mt-4">
              <div className="col-auto mt-2">
                <button className={NewClaimsStyle.cancelButton}>Cancel</button>
              </div>
              <div className="col-auto ml-2">
                <GenericButton
                  label="Reset"
                  // theme="normal"
                  type="submit"
                  btnClassname={NewClaimsStyle.resetBtn}
                />
              </div>
              <div className="col-auto">
                <GenericButton
                  label="Save & Next"
                  // theme="normal"
                  type="submit"
                  btnClassname={NewClaimsStyle.resetBtn}
                />
              </div>
            </div>{" "}
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
            <div className="row justify-content-end mt-4">
              <div className="col-auto mt-2">
                <button className={NewClaimsStyle.cancelButton} onClick={handleClick}>
                  Cancel
                </button>
              </div>
              <div className="col-auto ml-2">
                <GenericButton
                  label="Reset"
                  // theme="normal"
                  type="submit"
                  btnClassname={NewClaimsStyle.resetBtn}
                  onClick={handleReset}
                />
              </div>
              <div className="col-auto">
                <GenericButton
                  label="Save & Next"
                  // theme="normal"
                  type="submit"
                  btnClassname={NewClaimsStyle.resetBtn}
                />
              </div>
            </div>
          </form>
        </Cards>
      )}
      {activeSection === 1 && (
        <Cards>
          <AddItemsComponent onAssignItemsClick={handleAssignItemsClick} />
        </Cards>
      )}
      {activeSection === 2 && (
        <Cards>
          <AssignItemsComponent />
        </Cards>
      )}
    </div>
  );
}

export default NewclaimsComponent;
