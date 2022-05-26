import "./Searchbar.scss";
import { Link } from "react-router-dom";

export const WarehouseSearch = () => {
  return (
    <>
      <div className="warehouse__search-container">
        <div className="warehouse__search">
          <h1 className="warehouse__search-header">Warehouses</h1>
          <form className="warehouse__form">
            <input
              type="text"
              className="warehouse__form-input"
              placeholder="Search..."
            />
            <Link to="/warehouseAdd">
              <button className="warehouse__search-btn">
                + Add New Warehouse
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};
