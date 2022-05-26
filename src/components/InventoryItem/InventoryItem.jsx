import "./InventoryItem.scss";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";

export default function InventoryItem({
  id,
  warehouse,
  item,
  category,
  status,
  qty,

  openModal,
  closeModal,
  isOpen,
  selectedId,
}) {
  return (
    <div className="inventory">
      <ul className="inventory__tblt-list--results">
        <li className="inventory__tblt-list--item">
          <div className="inventory__list-item--container">
            <Link
              to={`/inventory/${id}`}
              className="inventory__list-item--link"
            >
              <p className="inventory__list-item">{item}</p>
              <img
                className="inventory__list-icon"
                src={chevron}
                alt="chevron"
              />
            </Link>
          </div>
        </li>
        <li className="inventory__tblt-list--item">
          <p className="inventory__list-info">{category}</p>
        </li>
        <li className="inventory__tblt-list--item">
          {status.toLowerCase() === "in stock" ? (
            <p className="inventory__in-stock">{status}</p>
          ) : (
            <p className="inventory__out-stock">{status}</p>
          )}
        </li>
        <li className="inventory__tblt-list--item">
          <p className="inventory__list-info">{qty}</p>
        </li>
        <li className="inventory__tblt-list--item">
          <p className="inventory__list-info">{warehouse}</p>
        </li>

        <div className="inventory__icon-container">
          <img
            className="inventory__icon-delete"
            src={deleteIcon}
            alt="trashcan icon"
            onClick={() => openModal(id)}
          />
          {isOpen === true && id === selectedId ? (
            <DeleteModal
              closeModal={closeModal}
              type={"inventory"}
              item={item}
              id={id}
            />
          ) : null}

          <Link to={`/inventoryEdit/${id}`}>
            <img
              className="inventory__icon-edit"
              src={editIcon}
              alt="edit icon"
            ></img>
          </Link>
        </div>
      </ul>
      <div className="inventory__all">
        <div className="inventory__container">
          <ul className="inventory__list-left">
            <li className="inventory__list-group">
              <h3 className="inventory__list-title">INVENTORY ITEM</h3>

              <div className="inventory__list-item--container">
                <Link
                  to={`/inventory/${id}`}
                  className="inventory__list-item--link"
                >
                  <p className="inventory__list-item">{item}</p>
                  <img
                    className="inventory__list-icon"
                    src={chevron}
                    alt="chevron"
                  />
                </Link>
              </div>
            </li>
            <li className="inventory__list-group">
              <h3 className="inventory__list-title">CATEGORY</h3>
              <p className="inventory__list-info">{category}</p>
            </li>
          </ul>
          <ul className="inventory__list-right">
            <li className="inventory__list-group">
              <h3 className="inventory__list-title">STATUS</h3>
              {status.toLowerCase() === "in stock" ? (
                <p className="inventory__in-stock">{status}</p>
              ) : (
                <p className="inventory__out-stock">{status}</p>
              )}
            </li>
            <li className="inventory__list-group">
              <h3 className="inventory__list-title">QTY</h3>
              <p className="inventory__list-info">{qty}</p>
            </li>
            <li className="inventory__list-group">
              <h3 className="inventory__list-title">WAREHOUSE</h3>
              <p className="inventory__list-info">{warehouse}</p>
            </li>
          </ul>
        </div>
        <div className="inventory__icon-container">
          <img
            className="inventory__icon-delete"
            src={deleteIcon}
            alt="trashcan icon"
            onClick={() => openModal(id)}
          />
          {isOpen === true && id === selectedId ? (
            <DeleteModal
              closeModal={closeModal}
              type={"inventory"}
              item={item}
              id={id}
            />
          ) : null}

          <Link to={`/inventoryEdit/${id}`}>
            <img
              className="inventory__icon-edit"
              src={editIcon}
              alt="edit icon"
            ></img>
          </Link>
        </div>
      </div>
    </div>
  );
}
