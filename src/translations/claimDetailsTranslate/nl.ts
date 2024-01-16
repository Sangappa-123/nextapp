const translate = {
  topOptionButtons: {
    calculateSettlement: "Calculate Settlement nl",
    calculateDepreciation: "Re-Calculate Depreciation nl",
    reAssignClaim: "Re-Assign Claim",
    supervisorReview: "Supervisor Review",
    closeClaim: "Close Claim",
    deleteClaim: "Delete Claim",
  },
  claimSnapshot: {
    claimSnapshotHeading: "Claim snapshot nl",
    claim: "Claim # nl",
    status: "Status",
    createdDate: "Created Date nl",
    elapsedTime: "Elapsed Time",
    lossType: "Loss Type",
    claimDeductible: "Claim Deductible nl",
    tax: "Tax %",
    contentLimits: "Content Limits",
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
  },

  addMessageCard: {
    messages: "Messages nl",
    addNewMessage: "Add New Messages nl",
    noNewMessage: "No New Message",
    viewAllMessges: "View All Messges",

    addNewMessageModal: {
      to: {
        label: "To nl",
        placeholder: "Select Participants",
      },
      message: {
        label: "Message nl",
        placeholder: "Message",
      },
      attachment: {
        label: "Attachment nl",
        linkName: "Click to add attachment",
      },
      errorMessages: {
        receipentErr: "Please select recipient nl",
        messageFieldsErr: "Message field is required.",
      },

      cancelBtn: "Cancel",
      addMsgBtn: "Add Message nl",
    },
  },

  policyHolderTaskCard: {
    modalHeading: "Create Task nl",
    policyHolderTask: "Policyholder's Task nl",
    createNewTask: "Create New Task",
    formName: "Form Name nl",
    status: "Status",
    assignedDate: "Assigned Date",
    noTask: "No task available",
    viewAll: "View all",

    createTaskModal: {
      assignedTo: "Assigned To nl",
      formName: "Form Name nl",
      description: "Description nl",
      cancelBtn: "Cancel",
      addformBtn: "Add Form",
    },
  },
};

export { translate };

export type claimDetailsTranslateType = typeof translate;
