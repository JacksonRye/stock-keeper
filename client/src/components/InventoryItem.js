import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const InventoryItem = ({item}) => {
  const { editItem } = useContext(GlobalContext);
  const { name, quantity, id } = item;

  return (
    <li onDoubleClick={() => editItem(item)} className="InventoryItem card">
      <p>{name || ""}</p>
      <p>{quantity || 0}</p>
    </li>
  );
};

export default InventoryItem;
