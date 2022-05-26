import React from "react";
import AddInventoryForm from "../../components/AddInventoryForm/AddInventoryForm";
import { Link } from "react-router-dom";
import back from "../../assets/icons/arrow_back-24px.svg";
import "./AddInventoryPage.scss";

function AddInventoryPage() {
  return (
    <>
      <div className="add__container">
        <div className="add__header">
          <Link to={"/inventory"}>
            <img className="back-arrow" src={back} alt="back arrow" />
          </Link>
          <h1 className="add__header-title">Add New Inventory Item</h1>
        </div>
        <AddInventoryForm />
      </div>
    </>
  );
}

export default AddInventoryPage;