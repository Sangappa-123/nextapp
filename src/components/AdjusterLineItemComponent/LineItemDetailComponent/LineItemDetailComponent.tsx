import React, { useEffect, useState } from "react";
import lineItemDetailComponentStyle from "./lineItemDetailComponent.module.scss";
import GroupedActionButtons from "./GroupedActionButtons";
import OrginalItemForm from "./OrginalItemForm";
import ReplacementItemSection from "./ReplacementItemSection";
import WebComparables from "./WebComparables";
import AddedComparables from "./AddedComparables";
import useCustomForm from "@/hooks/useCustomForm";
import { Output, any, minLength, object, string } from "valibot";
import { useAppSelector } from "@/hooks/reduxCustomHook";
import EnumStoreSlice from "@/reducers/EnumStoreSlice";
// import Modal from "@/components/common/ModalPopups";
// import GenericButton from "@/components/common/GenericButton";
import CustomComparable from "./CustomComparable";
import useBodyScrollbar from "@/hooks/useBodyScrollbar";

function LineItemDetailComponentForm({ rapidDivRef }: { rapidDivRef: any }) {
  const { hideScroll, showScroll } = useBodyScrollbar();
  const lineItem = useAppSelector(
    (state) => state[EnumStoreSlice.LINE_ITEM_DETAIL]?.lineItem
  );
  const CRN = useAppSelector((state) => state.session?.CRN);

  const [openCustomComparableModal, setOpenCustomComparableModal] = useState(false);
  const schema = object({
    description: string("Item description", [minLength(0)]),
    insuredPrice: any(),
    quantity: any(),
    scheduleAmount: any(),
    totalStatedAmount: any(),
    ageYears: any(),
    ageMonths: any(),
    brand: any(),
    model: any(),
  });

  useEffect(() => {
    if (openCustomComparableModal) {
      hideScroll();
    } else {
      showScroll();
    }
  }, [openCustomComparableModal, hideScroll, showScroll]);

  const defaultValue = {
    description: lineItem?.description,
    insuredPrice: lineItem?.insuredPrice,
    quantity: lineItem?.quantity,
    scheduleAmount: lineItem?.scheduleAmount,
    totalStatedAmount: lineItem?.totalStatedAmount,
    ageYears: lineItem?.ageYears,
    ageMonths: lineItem?.ageMonths,
    brand: lineItem?.brand,
    model: lineItem?.model,
  };

  const { register, handleSubmit, control, formState, getValues, setValue } =
    useCustomForm(schema, defaultValue);
  console.log("Error>>", formState.errors);
  const handleFormSubmit = (data: Output<typeof schema>) => {
    console.log("handleFormSubmit>>>>", data);
    try {
      const payload = {
        registrationNumber: CRN,
        comparableItems: [],
        claimItem: {
          acv: lineItem.acv,
          acvTax: lineItem.acvTax,
          acvTotal: lineItem.acvTotal,
          adjusterDescription: lineItem?.adjusterDescription,
          source: lineItem.source,
          ageMonths: lineItem.ageMonths,
          ageYears: lineItem.ageYears,
          appraisalDate: lineItem.appraisalDate,
          appraisalValue: lineItem.appraisalValue,
          approvedItemValue: lineItem.approvedItemValue,
          assignedTo: lineItem.assignedTo,
          brand: lineItem.brand,
          categoryLimit: lineItem.categoryLimit,
          claimId: lineItem.claimId,
          claimNumber: lineItem.claimNumber,
          dateOfPurchase: lineItem.dateOfPurchase,
          depriciationRate: lineItem.depriciationRate,
          description: lineItem.description,
          applyTax: lineItem.applyTax,
          holdOverPaymentDate: lineItem.holdOverPaymentDate,
          holdOverPaymentMode: lineItem.holdOverPaymentMode,
          holdOverPaymentPaidAmount: lineItem.holdOverPaymentPaidAmount,
          itemOverage: lineItem.itemOverage,
          scheduleAmount: lineItem.scheduleAmount,
          deductibleAmount: lineItem.deductibleAmount,
          individualLimitAmount: lineItem.individualLimitAmount,
          totalStatedAmount: lineItem.totalStatedAmount,
          id: lineItem.id,
          itemUID: lineItem.itemUID,
          insuredPrice: lineItem.insuredPrice > 0 ? lineItem.insuredPrice : 0,
          isReplaced: lineItem.isReplaced,
          replacementQty: lineItem.replacementQty,
          replacedItemPrice: lineItem.replacedItemPrice,
          isScheduledItem: lineItem.isScheduledItem,
          itemName: lineItem.itemName,
          itemType: lineItem.itemType,
          itemUsefulYears: lineItem.itemUsefulYears,
          model: lineItem.model,
          paymentDetails: lineItem.paymentDetails,
          quantity: lineItem.quantity > 0 ? lineItem.quantity : 0,
          quotedPrice: lineItem.quotedPrice,
          rcv: lineItem.rcv,
          rcvTax: lineItem.rcvTax,
          rcvTotal: lineItem.rcvTotal,
          receiptValue: lineItem.receiptValue > 0 ? lineItem.receiptValue : 0,
          depreciationAmount:
            lineItem.depreciationAmount > 0 ? lineItem.depreciationAmount : 0,
        },
      };
      console.log("payload:::", payload);
    } catch (error) {
      console.log("error>>>>", error);
    }
  };

  const closeCustomComparable = () => {
    setOpenCustomComparableModal(false);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={lineItemDetailComponentStyle.root}
    >
      <CustomComparable
        closeCustomComparable={closeCustomComparable}
        openCustomComparableModal={openCustomComparableModal}
      />
      {/* <Modal
        isOpen={openCustomComparableModal}
        onClose={closeCustomComparable}
        modalWidthClassName={lineItemDetailComponentStyle.modal}
        overlayClassName={lineItemDetailComponentStyle.modalOverlay}
        headingName="New Custom Comparable"
        footerContent={
          <div className={lineItemDetailComponentStyle.customComparableModalButton}>
            <GenericButton label="Mark Replacement" size="medium" />
            <GenericButton label="Add Comparable" size="medium" />
            <GenericButton
              label="Cancel"
              size="medium"
              onClickHandler={closeCustomComparable}
            />
          </div>
        }
        childComp={<CustomComparable />}
      /> */}
      <GroupedActionButtons />
      <div className={lineItemDetailComponentStyle.topItemSection}>
        <div ref={rapidDivRef} style={{ position: "absolute", top: 0 }} />
        <OrginalItemForm
          register={register}
          control={control}
          getValues={getValues}
          setValue={setValue}
        />
        <ReplacementItemSection
          showCustomComparableModal={() => setOpenCustomComparableModal(true)}
        />
      </div>
      <div className={lineItemDetailComponentStyle.bottomItemSection}>
        <WebComparables />
        <AddedComparables />
      </div>
    </form>
  );
}

export default LineItemDetailComponentForm;
