import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseGroup = ({ items, date }) => {
  console.log("EG", typeof items, items);

  if (items instanceof Map) {
    console.log("date", items.get(date));
  }

  return (
    <div className="ExpenseGroup">
      <h3>{date}</h3>

      {items instanceof Map ? (
        <ul>
          {items.get(date).map((item, index) => (
            <ExpenseItem key={index} item={item} />
          ))}
        </ul>
      ) : (
        <h3>Loading</h3>
      )}
    </div>
  );
};

export default ExpenseGroup;
