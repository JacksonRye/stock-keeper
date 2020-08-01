import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const ExpenseItem = ({ item }) => {
  const { editExpenseItem } = useContext(GlobalContext);

  const { name, quantity, price, total, date } = item;

  return (
    <li
      onDoubleClick={() => editExpenseItem(item)}
      className="ExpenseItem card"
    >
      <div>
        <h3>{date}</h3>
      </div>
      <div className="content">
        <p>{name}</p>
        <p>X {quantity}</p>
        <p>N{price}</p>
        <p>N{total}</p>
      </div>
    </li>
  );
};

export default ExpenseItem;
