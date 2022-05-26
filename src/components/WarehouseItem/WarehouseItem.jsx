import "./WarehouseItem.scss";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import edit from "../../assets/icons/edit-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";
import DeleteModal from "../DeleteModal/DeleteModal";
import del from "../../assets/icons/delete_outline-24px.svg";

export default function WarehouseItem({
  warehouses,
  isOpen,
  openModal,
  closeModal,
  selectedId,
}) {
  return (
    <>
      <ul className="warehouse__list">
        <div className="warehouse__header">
          <p>
            WAREHOUSE{" "}
            <img className="warehouse__header-svg" src={sort} alt="sort" />{" "}
          </p>
          <p>
            ADDRESS{" "}
            <img className="warehouse__header-svg" src={sort} alt="sort" />{" "}
          </p>
          <p>
            CONTACT NAME{" "}
            <img className="warehouse__header-svg" src={sort} alt="sort" />{" "}
          </p>
          <p>
            CONTACT INFORMATION
            <img className="warehouse__header-svg" src={sort} alt="sort" />{" "}
          </p>
          <p>ACTIONS</p>
        </div>

        {warehouses.map((warehouse) => {
          const { name, address, city, country, contact, id } = warehouse;
          return (
            <li className="warehouse__list-item" key={uuidv4()}>
              <div className="warehouse__main">
                <div className="warehouse__info">
                  <p className="warehouse__subhead">WAREHOUSE</p>

                  <Link
                    to={`/warehouse/${warehouse.id}`}
                    className="warehouse__link"
                  >
                    <p className="warehouse__info-name">{`${name} >`}</p>
                  </Link>

                  <p className="warehouse__subhead">ADDRESS</p>
                  <p className="warehouse__info-address">
                    {address}, {city}, {country}
                  </p>
                </div>
                <div className="warehouse__contact">
                  <p className="warehouse__subhead">CONTACT NAME</p>
                  <p className="warehouse__contact-name">{contact.name}</p>

                  <div className="warehouse__tablet">
                    <p className="warehouse__subhead">CONTACT INFORMATION </p>
                    <p className="warehouse__contact-phone">{contact.phone}</p>
                    <p className="warehouse__contact-email">{contact.email}</p>
                  </div>
                </div>
              </div>
              <div className="warehouse__buttons">
                {/* <Link to={`/warehouseDelete/${id}`}>
                  <img src={del} alt="delete" />
                </Link>
                <Link to={`/warehouseEdit/${id}`}>
                  <img src={edit} alt="sort" />
                </Link> */}

                <img src={del} alt="delete" onClick={() => openModal(id)} />
                {isOpen === true && id === selectedId ? (
                  <DeleteModal
                    closeModal={closeModal}
                    type={"warehouse"}
                    item={name}
                    id={id}
                  />
                ) : null}

                <Link to={`/warehouseEdit/${id}`}>
                  <img src={edit} alt="sort" />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
