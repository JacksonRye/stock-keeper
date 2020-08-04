export default (state, action) => {
  switch (action.type) {
    case "SET_MODAL":
      return { ...state, modalOpen: action.payload };

    // Inventory actions

    case "GET_INVENTORY_LIST":
      return { ...state, inventoryList: action.payload };

    case "EDIT_ITEM":
      return { ...state, inventoryItem: action.payload };

    case "SET_INVENTORY_ITEM":
      return { ...state, inventoryItem: action.payload };

    

    // expenses actions
    case "GET_EXPENSES":
      console.log("AR: expenses: ", action.payload);
      return { ...state, expenses: action.payload };

    case "EDIT_EXPENSE_ITEM":
      return { ...state, expenseItem: action.payload };

    case "SAVE_EDIT_EXPENSE_ITEM":
      return { ...state, expenses: action.payload };

    case "SET_EXPENSE_ITEM":
      return { ...state, expenseItem: action.payload };

    case "SAVE_NEW_EXPENSE_ITEM":
      return { ...state, expenses: action.payload };

    case "DELETE_EXPENSE_ITEM":
      return { ...state, expenses: action.payload };

    default:
      break;
  }
};
