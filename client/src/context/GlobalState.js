import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import { groupBy } from "../utils/utils";

export class Expense {
  constructor(expense) {
    this._id = expense._id || null;
    this.name = expense.name;
    this.quantity = expense.quantity;
    this.price = expense.price;
    this.date = expense.date.split("T")[0];
    this.location = expense.location;
  }

  get total() {
    return this.price * this.quantity;
  }
}

const locations = ["Ajip", "Rumokoro"];

const initialState = {
  modalOpen: false,
  menuOpen: false,
  loading: false,
  error: null,
  inventoryItem: {
    _id: null,
    name: "",
    quantity: 0,
    location: locations[0],
  },
  expenseItem: {
    _id: null,
    name: "",
    quantity: 0,
    price: 0,
    location: locations[0],
  },
  expenses: [],
  inventoryList: [],
  locations,
};

const expenseUrl = "/api/v1/expenses";
const inventoryUrl = "/api/v1/inventory";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
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
        location: locations[0],
      };
      state.expenseItem = {
        id: null,
        name: "",
        quantity: 0,
        price: 0,
        location: locations[0],

      };
    }
    dispatch({ type: "SET_MODAL", payload });
  }

  // Inventory Item actions

  async function getInventoryList() {
    try {
      const res = await axios.get(`${inventoryUrl}`);

      const payload = res.data.data;

      dispatch({
        type: "GET_INVENTORY_LIST",
        payload,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "INVENTORY_ERROR",
        payload: error.message,
      });
    }
  }

  async function saveEditItem(editItem) {
    console.log("saveEditItem called with: ", editItem);
    try {
      if (editItem._id) {
        console.log("edit item", editItem);

        await axios.put(`${inventoryUrl}/${editItem._id}`, editItem);
      } else {
        console.log("save item", editItem);
        await axios.post(`${inventoryUrl}`, editItem, config);
      }
    } catch (error) {
      console.log("Error at inventortyPost: ", error.response.data.error);
      dispatch({
        type: "INVENTORY_ERROR",
        payload: error.message,
      });
    }

    getInventoryList();
  }

  async function deleteInventoryItem(id) {
    try {
      await axios.delete(`${inventoryUrl}/${id}`);

      getInventoryList();
    } catch (error) {
      console.log(error);
      dispatch({
        type: "INVENTORY_ERROR",
        payload: error.message,
      });
    }
    setModalOpen(false);
  }

  function editItem(payload) {
    dispatch({
      type: "EDIT_ITEM",
      payload,
    });
    setModalOpen(true);
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
  function setInventoryLocation(payload) {
    console.log("setInventoryLocation", payload);
    dispatch({
      type: "SET_INVENTORY_ITEM",
      payload: { ...state.inventoryItem, location: payload },
    });
  }

  // Expense Item actions
  async function getExpenses() {
    try {
      const res = await axios.get(`${expenseUrl}`);

      const data = res.data.data;

      const payload = data.map((expense) => new Expense(expense));

      console.log("expenses GS", payload);

      dispatch({
        type: "GET_EXPENSES",
        payload,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "EXPENSES_ERROR",
        payload: error.message,
      });
    }
  }

  async function saveEditExpenseItem(editItem) {
    try {
      if (editItem._id) {
        await axios.put(`${expenseUrl}/${editItem._id}`, editItem);
      } else {
        await axios.post(`${expenseUrl}`, editItem, config);
      }
      getExpenses();
    } catch (error) {
      console.log(error);
      dispatch({
        type: "EXPENSES_ERROR",
        payload: error.message,
      });
    }
    getExpenses();
  }

  async function deleteExpenseItem(id) {
    try {
      await axios.delete(`${expenseUrl}/${id}`);
    } catch (error) {
      console.log(error);
      dispatch({
        type: "EXPENSES_ERROR",
        payload: error.message,
      });
    }
    setModalOpen(false);
    getExpenses();
  }

  function editExpenseItem(payload) {
    dispatch({
      type: "EDIT_EXPENSE_ITEM",
      payload,
    });
    setModalOpen(true);
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
  function setExpenseLocation(location) {
    dispatch({
      type: "SET_EXPENSE_ITEM",
      payload: { ...state.expenseItem, location },
    });
  }
  function setExpenseDate(value) {
    const date = new Date(value).toISOString().split("T")[0];
    console.log("date", date);
    dispatch({
      type: "SET_EXPENSE_ITEM",
      payload: { ...state.expenseItem, date },
    });
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
        locations: state.locations,
        setModalOpen,
        // Inventory action
        getInventoryList,
        editItem,
        setInventoryName,
        setInventoryQuantity,
        setInventoryLocation,
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
        setExpenseLocation,
        deleteExpenseItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
