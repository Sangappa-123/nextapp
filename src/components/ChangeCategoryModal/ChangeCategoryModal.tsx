"use client";
import React, { useState } from "react";
import Modal from "@/components/common/ModalPopups";
import { ConnectedProps, connect } from "react-redux";
import clsx from "clsx";
import { updateCliamCategoryFun } from "@/services/AdjusterPropertyClaimDetailService";
import { addNotification } from "@/reducers/Notification/NotificationSlice";
import changeCategoryStyle from "./changeCategoryStyle.module.scss";
import GenericInput from "../common/GenericInput";
import RadioButtons from "../common/RadioButtons";
import { fetchContentList } from "@/services/ClaimContentListService";

interface typeProps {
  [key: string | number]: any;
}

const ChangeCategoryModal: React.FC<connectorType & typeProps> = (props: any) => {
  const {
    isModalOpen,
    closeModal,
    category,
    claimContentListDataFull
  } = props;
  const [categotyFilter, setCategoryFilter] = useState("");

  const updateClaimCategoty = async (data: any) => {

    const selectedClaims = claimContentListDataFull && claimContentListDataFull.length>0 && claimContentListDataFull.filter(
      (item: any) =>  item.selected === true
    );
    const selectedClaimsIds= selectedClaims && selectedClaims.map((item:any)=>+item.itemId)
    
    const payload ={
      itemIds: selectedClaimsIds,
      categoryId: data
    }

    const updateItemRes = await updateCliamCategoryFun(payload);
    console.log('updateItemRes 200', updateItemRes)
    if (updateItemRes?.status === 200) {
     const result = await fetchContentList()

     if(result){
        props.addNotification({
          message: "Category Updated Successfully",
          id: "update_content_item_success",
          status: "success",
        });
      closeModal()
     }
      
    } else {
      props.addNotification({
        message:  "Something went wrong.",
        id: "update_content_item_failure",
        status: "error",
      });
    }
  };

  const modalData = category && category?.length > 0 && 
  category.filter((item:any) => item.categoryName.toLowerCase().includes(categotyFilter.toLowerCase()))
  .map((item:any)=>{ 
    return { label: item?.categoryName, value: item?.categoryId } 
  })

  console.log('props.claimDetail', props.claimDetail)
  console.log('props.claimContentdata', props.claimContentdata)
  
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      childComp={(
      <>   
        <div className={changeCategoryStyle.addItemContainer}>
          <div className={clsx("col-8 pb-3")}> 
              <GenericInput
                placeholder="Search...."
                id="Search"
                type="text"
                value={categotyFilter}
                onChange={(event:any) => setCategoryFilter(event.target.value)}
              />
          </div>
            <div className={clsx(changeCategoryStyle.radioButtonWrapper, "col-12")}>
              <RadioButtons 
                formControlClassname={changeCategoryStyle.formControlClassname}
                options={modalData} 
                selectedOption={null} 
                onChange={(e)=>{updateClaimCategoty(e)} }
              />
            </div>
           </div>
      </>)}
      headingName="Change Category"
      modalWidthClassName={changeCategoryStyle.modalWidth}
    >
    </Modal>
  );
};

const mapStateToProps = ({ claimContentdata, claimDetail }: any) => ({
  category: claimDetail.category,
  claimDetail: claimDetail,
  claimContentdata:claimContentdata
})
const mapDispatchToProps = {
  addNotification
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type connectorType = ConnectedProps<typeof connector>;
export default connector(ChangeCategoryModal);
