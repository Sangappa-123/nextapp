const translate = {
  topOptionButtons: {
    calculateSettlement: "Calculate Settlement",
    calculateDepreciation: "Re-Calculate Depreciation",
    reAssignClaim: "Re-Assign Claim",
    supervisorReview: "Supervisor Review",
    closeClaim: "Close Claim",
    deleteClaim: "Delete Claim",
  },
  claimSnapshot: {
    claimSnapshotHeading: "Claim snapshot",
    claim: "Claim #",
    status: "Status",
    createdDate: "Created Date",
    elapsedTime: "Elapsed Time",
    lossType: "Loss Type",
    deductible: "Deductible",
    tax: "Tax %",
    coverageLimits: "Coverage Limits",
    minItemToPrice: "Min. $ Item to Price",
    items: "Items",
    claimed: "claimed",
    processed: "processed",
    exposure: "Exposure",
    repl: "Repl",
    cash: "Cash",
    paid: "Paid",
    paidCash: "cash",
    holdover: "holdover",
    edit: "Edit",
    update: "Update",
    cancel: "Cancel",
  },

  addMessageCard: {
    messages: "Messages",
    addNewMessage: "Add New Messages",
    noNewMessage: "No New Message",
    viewAllMessges: "View All Messages",

    addNewMessageModal: {
      to: {
        label: "To",
        placeholder: "Select Participants",
      },
      message: {
        label: "Message",
        placeholder: "Message",
      },
      attachment: {
        label: "Attachment",
        linkName: "Click to add attachment",
      },
      errorMessages: {
        receipentErr: "Please select recipient",
        messageFieldsErr: "Message field is required.",
      },

      cancelBtn: "Cancel",
      addMsgBtn: "Add Message",
    },
  },

  policyHolderTaskCard: {
    modalHeading: "Create Task",
    policyHolderTask: "Policyholder's Task",
    createNewTask: "Create New Task",
    formName: "Form Name",
    status: "Status",
    assignedDate: "Assigned Date",
    noTask: "No task available",
    viewAll: "View all",

    createTaskModal: {
      assignedTo: "Assigned To",
      formName: "Form Name",
      description: "Description",
      cancelBtn: "Cancel",
      addformBtn: "Add Form",
    },
  },
};

export { translate };

export type claimDetailsTranslateType = typeof translate;
