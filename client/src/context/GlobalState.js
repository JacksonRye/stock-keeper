import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { groupBy } from "../utils/utils";

export class Expense {
  constructor(id, name, quantity, price, date) {
    this.id = id || null;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.date = date;
  }

  get total() {
    return this.price * this.quantity;
  }
}

const initialState = {
  modalOpen: false,
  menuOpen: false,
  loading: false,
  error: null,
  inventoryItem: {
    id: null,
    name: "",
    quantity: 0,
  },
  expenseItem: {
    id: null,
    name: "",
    quantity: 0,
    price: 0,
  },
  expenses: [],
  inventoryList: [
    {
      id: 1,
      name: "mop",
      quantity: 20,
    },
    {
      id: 2,
      name: "Broom",
      quantity: 30,
    },
    {
      id: 3,
      name: "Harpic",
      quantity: 10,
    },
  ],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // general actions

  function setModalOpen(payload) {
    if (!payload) {
      state.inventoryItem = {
        id: null,
        name: "",
        quantity: 0,
      };
      state.expenseItem = {
        id: null,
        name: "",
        quantity: 0,
        price: 0,
      };
    }
    dispatch({ type: "SET_MODAL", payload });
  }

  // Inventory Item actions

  function getInventoryList() {
    dispatch({
      type: "GET_INVENTORY_LIST",
      payload: state.inventoryList,
    });
  }

  function editItem(payload) {
    dispatch({
      type: "EDIT_ITEM",
      payload,
    });
    setModalOpen(true);
  }

  function saveEditItem(editItem) {
    console.log("saveEditItem called with: ", editItem);
    if (editItem.id) {
      const payload = state.inventoryList.map((item) => {
        const oldItem = state.inventoryList.find(
          ({ id }) => id === editItem.id
        );
        return oldItem ? editItem : item;
      });

      dispatch({
        type: "SAVE_EDIT_ITEM",
        payload,
      });
    } else {
      const payload = [...state.inventoryList, { ...editItem, id: 100 }];
      dispatch({
        type: "SAVE_NEW_ITEM",
        payload,
      });
    }
  }

  function setInventoryName(payload) {
    dispatch({
      type: "SET_INVENTORY_ITEM",
      payload: { ...state.inventoryItem, name: payload },
    });
  }
  function setInventoryQuantity(payload) {
    dispatch({
      type: "SET_INVENTORY_ITEM",
      payload: { ...state.inventoryItem, quantity: payload },
    });
  }

  function deleteInventoryItem(id) {
    const payload = state.inventoryList.filter((item) => item.id !== id);
    dispatch({
      type: "DELETE_INVENTORY_ITEM",
      payload,
    });
    setModalOpen(false);
  }

  // Expense Item actions
  function getExpenses() {
    const payload = state.expenses.map(
      (expense) => new Expense(...Object.values(expense))
    );
    console.log("payload", payload);
    dispatch({
      type: "GET_EXPENSES",
      payload,
    });
  }

  function editExpenseItem(payload) {
    dispatch({
      type: "EDIT_EXPENSE_ITEM",
      payload,
    });
    setModalOpen(true);
  }

  function saveEditExpenseItem(editItem) {
    if (editItem.id) {
      const payload = state.inventoryList.map((item) => {
        const oldItem = state.inventoryList.find(
          ({ id }) => id === editItem.id
        );
        return oldItem ? editItem : item;
      });

      dispatch({
        type: "SAVE_EDIT_EXPENSE_ITEM",
        payload,
      });
    } else {
      console.log("saveEdit", editItem);
      const newItem = new Expense(...Object.values(editItem));
      console.log("new Item", newItem);
      newItem.id = 100;
      const payload = [...state.expenses, newItem];

      dispatch({
        type: "SAVE_NEW_EXPENSE_ITEM",
        payload,
      });
    }
  }

  function setExpenseName(name) {
    dispatch({
      type: "SET_EXPENSE_ITEM",
      payload: { ...state.expenseItem, name },
    });
  }

  function setExpenseQuantity(quantity) {
    dispatch({
      type: "SET_EXPENSE_ITEM",
      payload: { ...state.expenseItem, quantity },
    });
  }

  function setExpensePrice(price) {
    dispatch({
      type: "SET_EXPENSE_ITEM",
      payload: { ...state.expenseItem, price },
    });
  }
  function setExpenseDate(value) {
    const date = new Date(value).toLocaleDateString();
    console.log("date", date);
    dispatch({
      type: "SET_EXPENSE_ITEM",
      payload: { ...state.expenseItem, date },
    });
  }

  function deleteExpenseItem(id) {
    const payload = state.inventoryList.filter((item) => item.id !== id);
    dispatch({
      type: "DELETE_EXPENSE_ITEM",
      payload,
    });
    setModalOpen(false);
  }

  return (
    <GlobalContext.Provider
      value={{
        modalOpen: state.modalOpen,
        menuOpen: state.menuOpen,
        loading: state.loading,
        error: state.error,
        inventoryItem: state.inventoryItem,
        expenseItem: state.expenseItem,

        setModalOpen,
        // Inventory action
        getInventoryList,
        editItem,
        setInventoryName,
        setInventoryQuantity,
        saveEditItem,
        deleteInventoryItem,
        inventoryList: state.inventoryList,
        // expense action
        getExpenses,
        expenses: state.expenses,
        editExpenseItem,
        saveEditExpenseItem,
        setExpenseName,
        setExpensePrice,
        setExpenseQuantity,
        setExpenseDate,
        deleteExpenseItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
