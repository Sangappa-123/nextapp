import ClmainInfoStyle from "./ClaimInfo.module.scss";
import GenericInput from "@/components/common/GenericInput";
import { useForm, Controller } from "react-hook-form";
import GenericSelect from "@/components/common/GenericSelect";
import { convertToCurrentTimezone } from "@/utils/helper";
interface UpdateClaimInfoType {
  claimSnapShotData: any;
  translate: any;
}

const UpdateClaimInfoForm: React.FC<UpdateClaimInfoType> = ({
  claimSnapShotData,
  translate,
}) => {
  const dateFormate = "MMM DD, YYYY h:mm A";

  const selectOptions = [
    {
      id: 1,
      name: "Water",
      active: true,
    },
    {
      id: 2,
      name: "Fire/Smoke",
      active: true,
    },
    {
      id: 3,
      name: "Lightning",
      active: true,
    },
    {
      id: 4,
      name: "Theft From Vehicle",
      active: true,
    },
    {
      id: 5,
      name: "Theft From Home",
      active: true,
    },
    {
      id: 6,
      name: "Mysterious Disappearance",
      active: true,
    },
    {
      id: 7,
      name: "Vandalism",
      active: true,
    },
    {
      id: 8,
      name: "Wind/Tornado/Hurricane/Hail",
      active: true,
    },
    {
      id: 9,
      name: "Not Specified",
      active: true,
    },
  ];

  const selectBoxStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: "white",
      border: "1px solid #c2cad8",
      boxShadow: "none",
      "&:focus, &:active": {
        border: "1px solid #4169e1",
      },
      height: "22px",
      minHeight: "22px",
    }),
    valueContainer: (styles: any) => ({ ...styles, bottom: "1.3px" }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      padding: "1px",
      height: "22px",
      width: "15px",
    }),
    clearIndicator: (styles: any) => ({
      ...styles,
      padding: "1px",
      height: "22px",
      width: "15px",
    }),
  };

  const defaultValues = {
    claimId: claimSnapShotData?.claimId,
    updatedClaimNumber: claimSnapShotData?.claimNumber,
    oldClaimNumber: claimSnapShotData?.claimNumber,
    damageTypeId: claimSnapShotData?.damageType,
    taxRate: claimSnapShotData?.taxRate,
    deductible: claimSnapShotData?.deductible,
    minimumThreshold: claimSnapShotData?.minimumThreshold,
    totalPolicyCoverage: 10000,
    policyLimit: claimSnapShotData?.policyLimit,
    individualLimit: null,
    isUpdatedByInsuranceUser: true,
    shippingDate: null,
    shippingMethod: null,
    additionalNote: null,
  };

  const { register, handleSubmit, setValue, control } = useForm({ defaultValues });

  const submitHandler = async (data: any) => {
    console.log("Submit data", data);
  };

  return (
    <form id="claim-snapshot-form" onSubmit={handleSubmit(submitHandler)}>
      <div className={`col-md-12 col-sm-12 col-12 ${ClmainInfoStyle.fieldRowContainer}`}>
        <fieldset
          className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
        >
          <legend className={ClmainInfoStyle.fieldSetLabel}>
            {translate?.claimSnapshot?.claim}
          </legend>
          <GenericInput
            setValue={setValue}
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
          <GenericInput
            setValue={setValue}
            {...register("taxRate")}
            inputFieldClassname={ClmainInfoStyle.customInput}
            type="number"
          />
        </fieldset>
      </div>
      <div className={`col-md-12 col-sm-12 col-12 ${ClmainInfoStyle.fieldRowContainer}`}>
        <fieldset
          className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
        >
          <legend className={ClmainInfoStyle.fieldSetLabel}>
            {translate?.claimSnapshot?.elapsedTime}
          </legend>
          <div className={ClmainInfoStyle.fieldValue}>{claimSnapShotData?.claimTime}</div>
        </fieldset>
        <fieldset
          className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
        >
          <legend className={ClmainInfoStyle.fieldSetLabel}>
            {translate?.claimSnapshot?.contentLimits}
          </legend>
          <GenericInput
            setValue={setValue}
            {...register("policyLimit")}
            inputFieldClassname={ClmainInfoStyle.customInput}
            type="number"
          />
        </fieldset>
        <fieldset
          className={`col-md-3 col-sm-3 col-6 ${ClmainInfoStyle.fieldSetContainer}`}
        >
          <legend className={ClmainInfoStyle.fieldSetLabel}>
            {translate?.claimSnapshot?.claimDeductible}
          </legend>
          <GenericInput
            {...register("deductible")}
            inputFieldClassname={ClmainInfoStyle.customInput}
            type="number"
          />
        </fieldset>
      </div>
      <div className={`col-md-12 col-sm-12 col-12 ${ClmainInfoStyle.fieldRowContainer}`}>
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
          <GenericInput
            {...register("minimumThreshold")}
            inputFieldClassname={ClmainInfoStyle.customInput}
            type="number"
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
            render={({ field: { ...rest } }: any) => (
              <GenericSelect
                customStyles={selectBoxStyles}
                isSearchable={false}
                options={selectOptions}
                getOptionLabel={(option: { name: any }) => option.name}
                getOptionValue={(option: { id: any }) => option.id}
                name={"selectOptions"}
                {...rest}
              />
            )}
          />
        </fieldset>
      </div>
    </form>
  );
};
export default UpdateClaimInfoForm;
