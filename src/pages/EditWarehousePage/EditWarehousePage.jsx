import "./EditWarehousePage.scss";
import { Link } from "react-router-dom";
import { Component } from "react";
import axios from "axios";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import errorIcon from "../../assets/icons/error-24px.svg";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";
import { Redirect } from "react-router-dom";

const siteWarehouse = 'https://alex-instock-server.herokuapp.com/warehouse/';

class EditWarehousePage extends Component {
  state = {
    isLoaded: false,
    redirect: false,
    name: "",
    address: "",
    city: "",
    country: "",
    contactName: "",
    position: "",
    phone: "",
    email: "",
  };

  emailCheck = () => {
    const check = /\S+@\S+\.\S+/;
    return check.test(this.state.email);
  };

  phoneCheck = () => {
    const check = /^[+]?[1]?[\s]?[(]?[0-9]{3}[)]?[\s]?[0-9]{3}[-]?[0-9]{4}$/;
    return check.test(this.state.phone);
  };

  validFormCheck = () => {
    let check = true;
    Object.entries(this.state).forEach(([key, value]) => {
      if (key !== "redirect" && !value) {
        check = false;
      }
    });
    return check;
  };

  saveHandler = (event) => {
    event.preventDefault();
    const data = event.target;
    if (this.validFormCheck() && this.emailCheck() && this.phoneCheck()) {
      const id = this.props.match.params.id;
      const contact = {
        name: data.contactName.value,
        position: data.position.value,
        phone: data.phone.value,
        email: data.email.value,
      };
      const {
        name: { value: name },
        address: { value: address },
        city: { value: city },
        country: { value: country },
      } = data;

      const finalData = {
        id,
        name,
        address,
        city,
        country,
        contact,
      };

      axios
        .patch(`${siteWarehouse}${id}`, finalData)
        .then((res) => {
          this.setState({
            redirect: true,
          });
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`${siteWarehouse}${id}`)
      .then(({ data }) => {
        const warehouse = data.warehouse;
        const { name, address, city, country, contact } = warehouse;
        const { position, phone, email } = contact;
        const contactName = contact.name;
        this.setState({
          name,
          address,
          city,
          country,
          contactName,
          position,
          phone,
          email,
          isLoaded: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  cancelHandler = (event) => {
    event.preventDefault();
    this.setState({
      redirect: true,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/"} />;
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="edit-warehouse-modal">
          <section className="edit-warehouse-modal__header">
            <Link to={"/"}>
              <img
                className="edit-warehouse-modal__header-image"
                src={backArrow}
                alt="back arrow"
              />
            </Link>
            <h2 className="edit-warehouse-modal__heading">Edit Warehouse</h2>
          </section>
          <form
            onSubmit={this.saveHandler}
            className="edit-warehouse-modal__form"
          >
            <div className="edit-warehouse-modal__information-container">
              <div className="edit-warehouse-modal__warehouse-details">
                <h3 className="edit-warehouse-modal__information-title">
                  Warehouse Details
                </h3>
                <label htmlFor="name" className="edit-warehouse-modal__label">
                  Warehouse Name
                </label>
                <input
                  className={`edit-warehouse-modal__input${
                    Boolean(!this.state.name.length) ? "--error" : ""
                  }`}
                  type="text"
                  name="name"
                  placeholder="Warehouse Name"
                  onChange={this.handleChange}
                  value={this.state.name}
                ></input>
                {Boolean(this.state.name.length) || (
                  <ErrorMsg src={errorIcon} />
                )}
                <label
                  htmlFor="address"
                  className="edit-warehouse-modal__label"
                >
                  Street Address
                </label>
                <input
                  className={`edit-warehouse-modal__input${
                    Boolean(!this.state.address.length) ? "--error" : ""
                  }`}
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  onChange={this.handleChange}
                  value={this.state.address}
                ></input>
                {Boolean(this.state.address.length) || (
                  <ErrorMsg src={errorIcon} />
                )}
                <label htmlFor="city" className="edit-warehouse-modal__label">
                  City
                </label>
                <input
                  className={`edit-warehouse-modal__input${
                    Boolean(!this.state.city.length) ? "--error" : ""
                  }`}
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={this.handleChange}
                  value={this.state.city}
                ></input>
                {Boolean(this.state.city.length) || (
                  <ErrorMsg src={errorIcon} />
                )}
                <label
                  htmlFor="country"
                  className="edit-warehouse-modal__label"
                >
                  Country
                </label>
                <input
                  className={`edit-warehouse-modal__input${
                    Boolean(!this.state.country.length) ? "--error" : ""
                  }`}
                  type="text"
                  name="country"
                  placeholder="Country"
                  onChange={this.handleChange}
                  value={this.state.country}
                ></input>
                {Boolean(this.state.country.length) || (
                  <ErrorMsg src={errorIcon} />
                )}
              </div>
              <div className="edit-warehouse-modal__contact-details">
                <h3 className="edit-warehouse-modal__information-title">
                  Contact Details
                </h3>
                <label
                  htmlFor="contactName"
                  className="edit-warehouse-modal__label"
                >
                  Contact Name
                </label>
                <input
                  className={`edit-warehouse-modal__input${
                    Boolean(!this.state.contactName.length) ? "--error" : ""
                  }`}
                  type="text"
                  name="contactName"
                  placeholder="Contact Name"
                  onChange={this.handleChange}
                  value={this.state.contactName}
                ></input>
                {Boolean(this.state.contactName.length) || (
                  <ErrorMsg src={errorIcon} />
                )}
                <label
                  htmlFor="position"
                  className="edit-warehouse-modal__label"
                >
                  Position
                </label>
                <input
                  className={`edit-warehouse-modal__input${
                    Boolean(!this.state.position.length) ? "--error" : ""
                  }`}
                  type="text"
                  name="position"
                  placeholder="Position"
                  onChange={this.handleChange}
                  value={this.state.position}
                ></input>
                {Boolean(this.state.position.length) || (
                  <ErrorMsg src={errorIcon} />
                )}
                <label htmlFor="phone" className="edit-warehouse-modal__label">
                  Phone Number
                </label>
                <input
                  className={`edit-warehouse-modal__input${
                    Boolean(!this.state.phone.length) || !this.phoneCheck()
                      ? "--error"
                      : ""
                  }`}
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={this.handleChange}
                  value={this.state.phone}
                ></input>
                {Boolean(!this.state.phone.length) || !this.phoneCheck() ? (
                  <ErrorMsg src={errorIcon} />
                ) : (
                  <></>
                )}
                <label htmlFor="email" className="edit-warehouse-modal__label">
                  Email
                </label>
                <input
                  className={`edit-warehouse-modal__input${
                    Boolean(!this.state.email.length) || !this.emailCheck()
                      ? "--error"
                      : ""
                  }`}
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={this.state.email}
                ></input>
                {Boolean(!this.state.email.length) || !this.emailCheck() ? (
                  <ErrorMsg src={errorIcon} />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="edit-warehouse-modal__button-container">
              <button
                onClick={this.cancelHandler}
                className="edit-warehouse-modal__cancel-button"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="edit-warehouse-modal__save-button"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default EditWarehousePage;
