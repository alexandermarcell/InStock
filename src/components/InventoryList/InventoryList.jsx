import "./InventoryList.scss";
import search from "../../assets/icons/search-24px.svg";
import InventoryItem from "../InventoryItem/InventoryItem";
import { Link } from "react-router-dom";
import sort from "../../assets/icons/sort-24px.svg";


export default function InventoryList({
  inventoryData,
  isOpen,
  openModal,
  closeModal,
  selectedId,
}) {

  return (
    <div className="inventory-list__container">
      <div className="inventory-list__subheader">
        <h1 className="inventory-list__title">Inventory</h1>
        <div className="inventory-list__search">
          <input
            className="inventory-list__searchbar"
            type="text"
            placeholder="Search..."
          ></input>
          <img
            className="inventory-list__searchicon"
            src={search}
            alt="search icon"
          ></img>
          <Link to={"/inventoryAdd"} className="inventory-list__link--add">
            <button className="inventory-list__button">+ Add New Item</button>
          </Link>
        </div>
      </div>
      <ul className="inventory__tblt-list">
        <li className="inventory__tblt-list--title">
          <h3>INVENTORY ITEM</h3>
          <img className="inventory__tblt-icon" src={sort} alt="unfold" />
        </li>
        <li className="inventory__tblt-list--title">
          <h3>CATEGORY</h3>
          <img className="inventory__tblt-icon" src={sort} alt="unfold" />
        </li>
        <li className="inventory__tblt-list--title">
          <h3>STATUS</h3>
          <img className="inventory__tblt-icon" src={sort} alt="unfold" />
        </li>
        <li className="inventory__tblt-list--title">
          <h3>QTY</h3>
          <img className="inventory__tblt-icon" src={sort} alt="unfold" />
        </li>
        <li className="inventory__tblt-list--title">
          <h3>WAREHOUSE</h3>
          <img className="inventory__tblt-icon" src={sort} alt="unfold" />
        </li>
        <li className="inventory__tblt-list--title">ACTIONS</li>
      </ul>

      {inventoryData.map((data) => {
        return (
          <InventoryItem
            key={data.id}
            id={data.id}
            warehouse={data.warehouseName}
            item={data.itemName}
            category={data.category}
            status={data.status}
            qty={data.quantity}

            openModal={openModal}
            closeModal={closeModal}
            isOpen={isOpen}
            selectedId={selectedId}

          />
        );
      })}
    </div>
  );
}
