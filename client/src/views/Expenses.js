import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import Body from "../components/Body";
import Modal from "../components/Modal";
import { GlobalContext } from "../context/GlobalState";
import ExpenseGroup from "../components/ExpenseGroup";
import { groupBy } from "../utils/utils";
import ExpenseItem from "../components/ExpenseItem";
import LocationGroup from "../components/LocationGroup";

const Expenses = () => {
  const {
    expenseItem,
    setModalOpen,
    modalOpen,
    expenses,
    getExpenses,
    setExpenseName,
    setExpenseQuantity,
    setExpensePrice,
    setExpenseLocation,
    setExpenseDate,
    deleteExpenseItem,
    saveEditExpenseItem,
    locations,
  } = useContext(GlobalContext);

  useEffect(() => {
    console.log("useEffect");
    getExpenses();
  }, []);

  console.log("expenses", expenses);

  const { name, quantity, price, _id, date, location } = expenseItem;

  const total = expenses.reduce((sum, { total }) => sum + total, 0);

  return (
    <div className="ExpensesView">
      <Header title="Total Expenses" amount={total} />
      <Body>
        <div
          onClick={() => setModalOpen(false)}
          className={"dark-background " + (modalOpen ? "show" : "hide")}
        ></div>
        <Modal onSave={() => saveEditExpenseItem(expenseItem)}>
          <div className="head">
            <i
              onClick={() => deleteExpenseItem(_id)}
              className="far fa-trash-alt"
            ></i>
            <h2>Add / Edit Expense</h2>
          </div>

          <div className="group">
            <input
              type="text"
              onChange={(e) => setExpenseName(e.target.value)}
              value={name}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Name</label>
          </div>

          <div className="group">
            <input
              onChange={(e) => setExpenseQuantity(e.target.value)}
              value={quantity}
              type="number"
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Quantity</label>
          </div>
          <div className="group">
            <input
              onChange={(e) => setExpensePrice(e.target.value)}
              value={price}
              type="number"
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Price</label>
          </div>
          <div className="group">
            <input
              onChange={(e) => setExpenseDate(e.target.value)}
              value={date}
              type="date"
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Date</label>
          </div>

          <div className="modal-location">
            <p>Location</p>
            <select
              value={location}
              onChange={(e) => setExpenseLocation(e.target.value)}
              id="location"
            >
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </Modal>

        <ul>
          {locations.map((location) => (
            <LocationGroup location={location}>
              {expenses
                .filter((expense) => expense.location === location)
                .map((expense, index) => (
                  <ExpenseItem key={index} item={expense} />
                ))}
            </LocationGroup>
          ))}
        </ul>
      </Body>
    </div>
  );
};

export default Expenses;
