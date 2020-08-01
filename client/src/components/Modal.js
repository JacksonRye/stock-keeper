import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Modal = ({ children, onSave }) => {
  const { modalOpen, setModalOpen } = useContext(GlobalContext);

  return (
    <form onSubmit={(e) => {e.preventDefault(); setModalOpen(false)}} className={"Modal card " + (modalOpen ? "show" : "hide")}>
      {children}

      <div className="buttons">
        <button onClick={onSave} className="save">Save</button>
        <button onClick={() => setModalOpen(false)} className="cancel">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Modal;
