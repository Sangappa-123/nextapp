"use client";

import React, { useEffect, useState } from "react";
import ClaimPolicyInformation from "./policyInformation.module.scss";
import { Controller } from "react-hook-form";
import GenericInput from "../common/GenericInput/index";
import clsx from "clsx";
import GenericSelect from "../common/GenericSelect/index";
import { fetchPolicyType, fetchState, validateEmail } from "@/services/ClaimService";
import ConfirmModal from "../common/ConfirmModal/ConfirmModal";
import { unknownObjectType } from "@/constants/customTypes";
import useTranslation from "@/hooks/useTranslation";
import { newClaimTransalateType } from "@/translations/newClaimTransalate/en";

function ClaimpolicyInformation({
  register,
  error,
  control,
  setValue,
  updateHomeOwnerType,
  resetField,
  getValues,
  clearErrors,
  setCustomerror,
  customerror,
}: any) {
  const [options, setOptions] = useState([]);
  const [show, setShow] = useState(false);
  const [policyDetails, setpolicyDetails] = useState<unknownObjectType | null>(null);

  const { onChange: emailChange, ...rest } = register("email");

  const verifyEmail = (email: string) => {
    validateEmail({
      email: email,
    })
      .then((res) => {
        setShow(true);
        setpolicyDetails(res.data);
      })

      .catch((error) => console.log("verify errr", error));
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleGetData = () => {
    setValue("firstname", policyDetails?.firstName, { shouldValidate: true }),
      setValue("lastname", policyDetails?.lastName, { shouldValidate: true });
    setValue("mobilenumber", policyDetails?.cellPhone, { shouldValidate: true });
    setValue("secondaryPhonenumber", policyDetails?.dayTimePhone, {
      shouldValidate: true,
    });
    setValue("address", policyDetails?.address.streetAddressOne, {
      shouldValidate: true,
    });
    setValue("address1", policyDetails?.address.streetAddressTwo, {
      shouldValidate: true,
    });
    setValue("address2", policyDetails?.address.city, { shouldValidate: true });
    setValue("state", policyDetails?.address.state, { shouldValidate: true });
    getPolicyType(policyDetails?.address.state.id);
    setValue("zipcode", policyDetails?.address.zipcode, { shouldValidate: true });
    clearErrors("claim");
    clearErrors("minItemPrice");
    clearErrors("contentLimits");
    handleClose();
  };
  useEffect(() => {
    fetchState({
      isTaxRate: false,
      isTimeZone: false,
    })
      .then((res) => {
        setOptions(res.data);
      })
      .catch((error) => console.log("state errr", error));
  }, []);

  /* eslint-disable no-useless-escape */
  const regex: RegExp =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const getPolicyType = (id: number) => {
    const stateId = getValues("state")?.id;
    if (!stateId) return;
    fetchPolicyType(id)
      .then((res) => {
        updateHomeOwnerType(res.data);
      })
      .catch((error) => console.log("policy errr", error));
  };

  const {
    translate,
    loading,
  }: { translate: newClaimTransalateType | undefined; loading: boolean } =
    useTranslation("newClaimTransalate");
  if (loading) {
    return null;
  }

  return (
    <div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2 ml-8 text-right")}>
          <label className={ClaimPolicyInformation.label}>Email</label>
        </div>
        <div className={clsx("col-lg-3 col-md-4 col-sm-12 mt-2")}>
          <GenericInput
            placeholder="E-mail"
            showError={error["email"]}
            errorMsg={error?.email?.message}
            isFixedError={true}
            onChange={(e: any) => {
              emailChange(e);
              const emailValue = e.target.value;
              if (emailValue.match(regex) != null) {
                verifyEmail(emailValue);
              }
            }}
            {...rest}
          />
          {show && (
            <div>
              <ConfirmModal
                showConfirmation={true}
                closeHandler={handleClose}
                submitBtnText="Yes"
                closeBtnText="No"
                childComp="This policyholder email already exists! Do you want to prepopulate the data? Please Confirm!"
                modalHeading="Policyhlder Info"
                submitHandler={() => handleGetData()}
              />
            </div>
          )}
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimPolicyInformation.label}>
            <span style={{ color: "red" }}>*</span> {translate?.firstName ?? ""}
          </label>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12">
          <GenericInput
            placeholder="First Name"
            showError={error["firstname"]}
            errorMsg={error?.firstname?.message}
            {...register("firstname")}
            singleValue
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimPolicyInformation.label}>
            {" "}
            <span style={{ color: "red" }}>*</span>
            {translate?.lastName ?? ""}
          </label>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <GenericInput
            placeholder="Last Name"
            showError={error["lastname"]}
            errorMsg={error?.lastname?.message}
            {...register("lastname")}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimPolicyInformation.label}>
            {" "}
            {translate?.mobileNumber ?? ""}
          </label>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <Controller
            name="mobilenumber"
            control={control}
            render={({ field }: any) => (
              <GenericInput
                placeholder="XXX-XXX-XXXX"
                keyboardType="phone-pad"
                // {...register("mobilenumber")}
                showError={customerror["phone"]}
                errorMsg={customerror?.phone}
                phoneFormatter={true}
                onValueChange={(values: any) => field.onChange(values.value)}
                onInput={(e: { target: { value: string } }) => {
                  if (e.target.value && e.target.value.length < 14) {
                    setCustomerror((prev: any) => {
                      return {
                        ...prev,
                        phone: "Enter valid phone number",
                      };
                    });
                  } else {
                    setCustomerror((prev: any) => {
                      return {
                        ...prev,
                        phone: null,
                      };
                    });
                  }
                }}
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimPolicyInformation.label}>
            {translate?.secondaryPhoneNumber ?? ""}
          </label>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <Controller
            name="mobilenumber"
            control={control}
            render={({ field }: any) => (
              <GenericInput
                placeholder="XXX-XXX-XXXX"
                // {...register("secondaryPhonenumber")}
                showError={customerror["secondaryphone"]}
                errorMsg={customerror?.secondaryphone}
                phoneFormatter={true}
                onValueChange={(values: any) => field.onChange(values.value)}
                onInput={(e: { target: { value: string } }) => {
                  if (e.target.value && e.target.value.length < 14) {
                    setCustomerror((prev: any) => {
                      return {
                        ...prev,
                        secondaryphone: "Enter valid phone number",
                      };
                    });
                  } else {
                    setCustomerror((prev: any) => {
                      return {
                        ...prev,
                        secondaryphone: null,
                      };
                    });
                  }
                }}
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div className="row mt-3 align-items-start">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 mt-2 text-right")}>
          <label className={ClaimPolicyInformation.label}>
            {" "}
            {translate?.address ?? ""}
          </label>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12">
          <GenericInput
            placeholder="Street Address 1"
            formControlClassname="mb-3"
            {...register("address")}
          />
          <GenericInput
            placeholder="Street Address 2"
            formControlClassname="mb-3"
            {...register("address1")}
          />
          <GenericInput
            placeholder="City / Town"
            formControlClassname="mb-3"
            {...register("address2")}
          />
        </div>
      </div>
      <div className="row align-items-center">
        <div className={clsx("col-lg-3 col-md-2 col-sm-12 text-right")}>
          <label className={clsx(ClaimPolicyInformation.label)}>
            <span style={{ color: "red" }}>*</span> {translate?.state ?? ""}
          </label>
        </div>
        <div className="col-lg-2">
          <Controller
            control={control}
            name="state"
            render={({ field: { onChange: fieldOnChange, ...rest } }: any) => (
              <GenericSelect
                options={options}
                name="state"
                onChange={(e: any) => {
                  fieldOnChange(e);
                  resetField("homeOwnersPolicyType");
                  console.log("onselect", e?.state);
                  if (e) getPolicyType(e.id);
                  else updateHomeOwnerType([]);
                }}
                {...rest}
                getOptionLabel={(option: { state: any }) => option.state}
                getOptionValue={(option: { id: any }) => option.id}
              />
            )}
          />
        </div>

        <div className={clsx("col-auto")}>
          <label className={clsx(ClaimPolicyInformation.label)}>
            <span style={{ color: "red" }}>*</span> {translate?.zipCode ?? ""}
          </label>
        </div>
        <div className={clsx("col-lg-2 col-md-2 col-sm-12  justify-content-left")}>
          <GenericInput
            placeholder="Zip Code"
            {...register("zipcode")}
            showError={error["zipcode"]}
            errorMsg={error?.zipcode?.message}
            maxLength="5"
          />{" "}
        </div>
      </div>
    </div>
  );
}

export default ClaimpolicyInformation;
