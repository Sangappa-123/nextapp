const translate = {
  modalHeading: "Add Item nl",

  inputFields: {
    ItemDescription: {
      label: "Item Description nl:",
      placeholder: "Description",
    },
    quantity: {
      label: "Quantity nl",
      placeholder: "Quantity",
    },
    price: {
      label: "Price nl",
      placeholder: "$0.00",
    },
    category: {
      label: "Category",
    },
    subCategory: {
      label: "Sub Category",
    },
    age: {
      label: "Age",
    },
    years: {
      label: "(Years)",
      placeholder: "Years",
    },
    months: {
      label: "(Months)",
      placeholder: "Months",
    },
    room: {
      label: "Room nl",
      newRoom: "Click to add new Room",
      roomNameLabel: "Room Name",
      cancelBtn: "Cancel",
      roomTypeLabel: "Room Type",
      createBtn: "Create",
    },
    applyTaxes: {
      label: "Apply Taxes(%)",
      yesBtn: "Yes",
      noBtn: "No",
    },
    condition: {
      label: "Condition",
      placeholder: "Average",
    },
    purchasedFrom: {
      label: "Originally Purchased From",
      newRetailerLink: "Not found? click to add retailer",
      addRetailerPlaceholder: "Add Retailer",
    },
    scheduledItem: {
      label: "Scheduled Item",
      yesBtn: "Yes",
      noBtn: "No",
      amount: "Scheduled Amount",
      amountPlaceholder: "Scheduled Amount",
    },
    addAttachmentBtn: "Add attachments",
    saveAndAddAnotherItemLink: "Save and Add Another Item",
    addItemBtn: "Add Item",
    resetBtn: "Reset",
  },
  inputErrors: {
    decriptionRequired: "Description must be a string.",
  },
};

export { translate };

export type addItemModalTranslateType = typeof translate;
