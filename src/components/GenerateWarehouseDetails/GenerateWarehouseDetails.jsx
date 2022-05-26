import "./GenerateWarehouseDetails.scss";
import arrow from "../../assets/icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";

export default function GenerateWarehouseDetails({ warehouse, contact }) {
  const { name, address, city, country, id } = warehouse;
  const { position, phone, email } = contact;

  return (
    <div className="details">
      <div className="details__header">
        <h1 className="details__title">
          <Link to="/">
            <img className="details__header-icon" src={arrow} alt="arrow" />
          </Link>
          {name}
        </h1>

        <Link to={`/warehouseEdit/${id}`}>
          <button className="details__btn">
            {" "}
            <p className="details__btn-text">Edit</p>{" "}
          </button>
        </Link>
      </div>

      <div className="details__contact">
        <div className="details__address">
          <p className="details__subhead">WAREHOUSE ADDRESS</p>
          <p>
            {address},{city},{country}
          </p>
        </div>

        <div className="details__split">
          <div className="details__name">
            <p className="details__subhead">CONTACT NAME</p>
            <p className="details__contact-name">{contact.name}</p>
            <p>{position}</p>
          </div>

          <div className="details__email">
            <p className="details__subhead">CONTACT INFORMATION</p>
            <p>{phone}</p>
            <p>{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
