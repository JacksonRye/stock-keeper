import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import Body from "../components/Body";
import { GlobalContext } from "../context/GlobalState";
import Modal from "../components/Modal";
import InventoryItem from "../components/InventoryItem";
import LocationGroup from "../components/LocationGroup";

const Inventory = () => {
  const {
    saveEditItem,
    setModalOpen,
    modalOpen,
    inventoryItem,
    setInventoryName,
    setInventoryQuantity,
    setInventoryLocation,
    inventoryList,
    deleteInventoryItem,
    getInventoryList,
    locations,
  } = useContext(GlobalContext);

  const { name, quantity, _id, location } = inventoryItem;

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
          <div className="modal-location">
            <p>Location</p>
            <select
              value={location}
              onChange={(e) => setInventoryLocation(e.target.value)}
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
          {locations.map((location, index) => (
            <LocationGroup key={index} location={location}>
              {inventoryList
                .filter((item) => item.location === location)
                .map((item, index) => (
                  <InventoryItem key={index} item={item} />
                ))}
            </LocationGroup>
          ))}
        </ul>
      </Body>
    </div>
  );
};

export default Inventory;
