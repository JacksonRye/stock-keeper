import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import Body from "../components/Body";
import { GlobalContext } from "../context/GlobalState";
import Modal from "../components/Modal";
import InventoryItem from "../components/InventoryItem";

const Inventory = () => {
  const {
    saveEditItem,
    setModalOpen,
    modalOpen,
    inventoryItem,
    setInventoryName,
    setInventoryQuantity,
    inventoryList,
    deleteInventoryItem,
    getInventoryList,
  } = useContext(GlobalContext);

  const { name, quantity, _id } = inventoryItem;

  useEffect(() => {
    getInventoryList();
  }, []);

  return (
    <div className="InventoryView">
      <Header title="Inventory Items" amount={inventoryList.length} />
      <Body>
        <div
          onClick={() => setModalOpen(false)}
          className={"dark-background " + (modalOpen ? "show" : "hide")}
        ></div>

        <Modal onSave={() => saveEditItem(inventoryItem)}>
          <div className="head">
            <i
              onClick={() => deleteInventoryItem(_id)}
              className="far fa-trash-alt"
            ></i>
            <h2>Add / Edit Item</h2>
          </div>

          <div className="group">
            <input
              type="text"
              onChange={(e) => setInventoryName(e.target.value)}
              value={name}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Name</label>
          </div>
          <div className="group">
            <input
              onChange={(e) => setInventoryQuantity(e.target.value)}
              value={quantity}
              type="number"
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Quantity</label>
          </div>
        </Modal>

        <ul>
          {inventoryList.map((item, index) => (
            <InventoryItem key={index} item={item} />
          ))}
        </ul>
      </Body>
    </div>
  );
};

export default Inventory;
