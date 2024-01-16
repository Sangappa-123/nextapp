"use client";
import ClmainInfoStyle from "./ClaimInfo.module.scss";
import GenericInput from "@/components/common/GenericInput";
import { useForm, Controller } from "react-hook-form";
import GenericSelect from "@/components/common/GenericSelect";
import { convertToCurrentTimezone } from "@/utils/helper";
import { getLossTypes } from "@/services/AdjusterPropertyClaimDetailServices/ClaimSnapShotService";
import { useEffect, useMemo, useState } from "react";
import Loading from "@/app/[lang]/loading";
interface UpdateClaimInfoType {
  claimSnapShotData: any;
  translate: any;
  defaultValue: object;
}

const UpdateClaimInfoForm: React.FC<UpdateClaimInfoType> = ({
  claimSnapShotData,
  translate,
  defaultValue,
}) => {
  const [selectOptions, setSelectOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const dateFormate = "MMM DD, YYYY h:mm A";
  useEffect(() => {
    const fetchLossType = async () => {
      setLoading(true);
      const lossTypeRes = await getLossTypes();
      setSelectOptions(lossTypeRes?.data);
      setLoading(false);
    };
    fetchLossType();
  }, []);

  const selectBoxStyles = {
    control: {
      boxShadow: "none",
      "&:focus, &:active": {
        border: "none",
      },
      border: "none",
      height: "16.67px",
      minHeight: "16.67px",
      bottom: "1.5px",
      paddingLeft: 0,
      paddingTop: 0,
    },
    singleValue: {
      fontSize: "12px",
      marginLeft: 0,
    },
    dropdownIndicator: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    indicatorSeparator: {
      display: "none",
    },
    clearIndicator: {
      display: "none",
    },
  };

  // console.log("claimSnapShotData", claimSnapShotData);

  const defaultValues = {
    claimId: claimSnapShotData?.claimId,
    updatedClaimNumber: claimSnapShotData?.claimNumber,
    oldClaimNumber: claimSnapShotData?.claimNumber,
    damageTypeId: claimSnapShotData?.damageTypeId,
    damageType: claimSnapShotData?.damageType,
    taxRate: claimSnapShotData?.taxRate,
    deductible: claimSnapShotData?.deductible,
    minimumThreshold: claimSnapShotData?.minimumThreshold,
    totalPolicyCoverage: claimSnapShotData?.policyLimit,
    policyLimit: claimSnapShotData?.policyLimit,
    individualLimit: claimSnapShotData?.individualLimit,
    isUpdatedByInsuranceUser: true,
    shippingDate: null,
    shippingMethod: null,
    additionalNote: claimSnapShotData?.additionalNote,
  };

  const { register, handleSubmit, control, setValue } = useForm({ defaultValues });

  useMemo(() => {
    if (defaultValue) setValue("damageTypeId", defaultValue);
  }, [defaultValue, setValue]);

  const submitHandler = async (data: any) => {
    const payload = {
      ...data,
      damageTypeId: data?.damageTypeId?.id,
      claimProfile: "Contents",
    };
    console.log("Submit data", payload);
  };

  return (
    <>
      {loading && <Loading />}
      <form id="claim-info-update-form" onSubmit={handleSubmit(submitHandler)}>
        <div
          className={`col-md-12 col-sm-12 col-12 ${ClmainInfoStyle.fieldRowContainer}`}
        >
          <fieldset
            className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
          >
            <legend className={ClmainInfoStyle.fieldSetLabel}>
              {translate?.claimSnapshot?.claim}
            </legend>
            <GenericInput
              {...register("updatedClaimNumber")}
              inputFieldClassname={ClmainInfoStyle.customInput}
            />
          </fieldset>
          <fieldset
            className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
          >
            <legend className={ClmainInfoStyle.fieldSetLabel}>
              {translate?.claimSnapshot?.status}
            </legend>
            <div className={ClmainInfoStyle.fieldValue}>
              {claimSnapShotData?.claimStatus?.status}
            </div>
          </fieldset>
          <fieldset
            className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
          >
            <legend className={ClmainInfoStyle.fieldSetLabel}>
              {translate?.claimSnapshot?.tax}
            </legend>
            <Controller
              name="taxRate"
              control={control}
              render={({ field }: any) => (
                <GenericInput
                  inputFieldClassname={ClmainInfoStyle.customInput}
                  value={defaultValues?.policyLimit}
                  onValueChange={(values: any) => field.onChange(values.value)}
                  percentageFormatter={true}
                  type="number"
                  {...field}
                />
              )}
            />
          </fieldset>
        </div>
        <div
          className={`col-md-12 col-sm-12 col-12 ${ClmainInfoStyle.fieldRowContainer}`}
        >
          <fieldset
            className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
          >
            <legend className={ClmainInfoStyle.fieldSetLabel}>
              {translate?.claimSnapshot?.elapsedTime}
            </legend>
            <div className={ClmainInfoStyle.fieldValue}>
              {claimSnapShotData?.claimTime}
            </div>
          </fieldset>
          <fieldset
            className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
          >
            <legend className={ClmainInfoStyle.fieldSetLabel}>
              {translate?.claimSnapshot?.coverageLimits}
            </legend>
            <Controller
              name="policyLimit"
              control={control}
              render={({ field }: any) => (
                <GenericInput
                  {...register("policyLimit")}
                  inputFieldClassname={ClmainInfoStyle.customInput}
                  value={defaultValues?.policyLimit}
                  // type="number"
                  onValueChange={(values: any) => field.onChange(values.value)}
                  priceFormatter={true}
                  {...field}
                />
              )}
            />
          </fieldset>
          <fieldset
            className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
          >
            <legend className={ClmainInfoStyle.fieldSetLabel}>
              {translate?.claimSnapshot?.deductible}
            </legend>
            <Controller
              name="deductible"
              control={control}
              render={({ field }: any) => (
                <GenericInput
                  inputFieldClassname={ClmainInfoStyle.customInput}
                  value={defaultValues?.deductible}
                  onValueChange={(values: any) => field.onChange(values.value)}
                  priceFormatter={true}
                  {...field}
                />
              )}
            />
          </fieldset>
        </div>
        <div
          className={`col-md-12 col-sm-12 col-12 ${ClmainInfoStyle.fieldRowContainer}`}
        >
          <fieldset
            className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
          >
            <legend className={ClmainInfoStyle.fieldSetLabel}>
              {translate?.claimSnapshot?.createdDate}
            </legend>
            <div className={ClmainInfoStyle.fieldValue}>
              {convertToCurrentTimezone(claimSnapShotData?.createdDate, dateFormate)}
            </div>
          </fieldset>
          <fieldset
            className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
          >
            <legend className={ClmainInfoStyle.fieldSetLabel}>
              {translate?.claimSnapshot?.minItemToPrice}
            </legend>
            <Controller
              name="minimumThreshold"
              control={control}
              render={({ field }: any) => (
                <GenericInput
                  inputFieldClassname={ClmainInfoStyle.customInput}
                  value={defaultValues?.minimumThreshold}
                  onValueChange={(values: any) => field.onChange(values.value)}
                  priceFormatter={true}
                  {...field}
                />
              )}
            />
          </fieldset>
          <fieldset
            className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
          >
            <legend className={ClmainInfoStyle.fieldSetLabel}>
              {translate?.claimSnapshot?.lossType}
            </legend>
            <Controller
              control={control}
              name={"damageTypeId"}
              rules={{ required: true }}
              defaultValue={defaultValue}
              render={({ field: { ...rest } }: any) => (
                <GenericSelect
                  customStyles={selectBoxStyles}
                  isClearable={false}
                  isSearchable={false}
                  options={selectOptions}
                  getOptionLabel={(option: { name: any }) => option.name}
                  getOptionValue={(option: { id: any }) => option.id}
                  name={"damageTypeId"}
                  {...rest}
                />
              )}
            />
          </fieldset>
        </div>
      </form>
    </>
  );
};
export default UpdateClaimInfoForm;
