import logo from "../../assets/logo/InStock-Logo_1x.png";
import { Link, NavLink } from "react-router-dom";
import "./PageHeader.scss";

function PageHeader() {
  return (
    <div className="wrapper">
      <header className="header">
        <div className="header__title">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="header__container">
          <nav className="header__nav">
            <div className="header__nav-warehouse">
              <NavLink
                to="/"
                exact
                className={() =>
                  "header__links--active" ? "header__links" : ""
                }
              >
                Warehouse
              </NavLink>
            </div>
            <div className="header__nav-inventory">
              <NavLink
                to="/inventory"
                className={() =>
                  "header__links--active" ? "header__links" : ""
                }
              >
                Inventory
              </NavLink>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default PageHeader;
