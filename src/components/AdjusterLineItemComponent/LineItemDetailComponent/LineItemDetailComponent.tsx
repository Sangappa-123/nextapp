import React from "react";
import lineItemDetailComponentStyle from "./lineItemDetailComponent.module.scss";
import GroupedActionButtons from "./GroupedActionButtons";
import OrginalItemForm from "./OrginalItemForm";
import ReplacementItemSection from "./ReplacementItemSection";
import WebComparables from "./WebComparables";
import AddedComparables from "./AddedComparables";
import useCustomForm from "@/hooks/useCustomForm";
import { Output, any, object, string } from "valibot";
import { useAppSelector } from "@/hooks/reduxCustomHook";
import EnumStoreSlice from "@/reducers/EnumStoreSlice";

function LineItemDetailComponentForm({ rapidDivRef }: { rapidDivRef: any }) {
  const lineItem = useAppSelector(
    (state) => state[EnumStoreSlice.LINE_ITEM_DETAIL]?.lineItem
  );
  const CRN = useAppSelector((state) => state.session?.CRN);
  // const roomSchema = object({
  //   id: number("Room id"),
  //   roomName: string("Room Name"),
  // });
  const schema = object({
    description: string("Item description"),
    category: object({
      categoryId: any(),
      categoryName: string(),
    }),
    subCategory: object({
      id: any(),
      name: string(),
    }),
    insuredPrice: any(),
    quantity: any(),
    totalStatedAmount: any(),
    ageYears: any(),
    ageMonths: any(),
    brand: string(),
    model: string(),
    originallyPurchasedFrom: object({
      id: any(),
      name: string(),
    }),
    purchaseMethod: object({
      label: string(),
      value: string(),
    }),
    // condition: object({
    //   conditionId: number(),
    //   conditionName: string(),
    // }),
    condition: any(),
    room: any(),
  });

  const defaultValue = {
    description: lineItem?.description,
    category: {
      categoryId: lineItem?.category?.id,
      categoryName: lineItem?.category?.name,
    },
    subCategory: {
      id: lineItem?.subCategory?.id,
      name: lineItem?.subCategory?.name,
    },
    insuredPrice: lineItem?.insuredPrice,
    quantity: lineItem?.quantity,
    totalStatedAmount: lineItem?.totalStatedAmount,
    ageYears: lineItem?.ageYears,
    ageMonths: lineItem?.ageMonths,
    brand: lineItem?.brand,
    model: lineItem?.model,
    originallyPurchasedFrom: {
      id: lineItem?.originallyPurchasedFrom?.id,
      name: lineItem?.originallyPurchasedFrom?.name,
    },
    purchaseMethod: {
      label: lineItem?.purchaseMethod,
      value: lineItem?.purchaseMethod,
    },
    condition: {
      conditionId: lineItem?.condition?.conditionId,
      conditionName: lineItem?.condition?.conditionName,
    },
    room: lineItem?.room
      ? {
          id: lineItem?.room?.id,
          roomName: lineItem?.room?.roomName,
        }
      : null,
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
      console.log("============", payload);
    } catch (error) {
      console.log();
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={lineItemDetailComponentStyle.root}
    >
      <GroupedActionButtons />
      <div className={lineItemDetailComponentStyle.topItemSection}>
        <div ref={rapidDivRef} style={{ position: "absolute", top: 0 }} />
        <OrginalItemForm
          register={register}
          control={control}
          getValues={getValues}
          setValue={setValue}
        />
        <ReplacementItemSection />
      </div>
      <div className={lineItemDetailComponentStyle.bottomItemSection}>
        <WebComparables />
        <AddedComparables />
      </div>
    </form>
  );
}

export default LineItemDetailComponentForm;
