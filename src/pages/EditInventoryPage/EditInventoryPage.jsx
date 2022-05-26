import { Component } from "react";
import axios from "axios";
import errorIcon from "../../assets/icons/error-24px.svg";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";
import dropdown from "../../assets/icons/arrow_drop_down-24px.svg";
import { Link } from "react-router-dom";
import back from "../../assets/icons/arrow_back-24px.svg";
import "./EditInventoryPage.scss";

const siteInventory = 'https://alex-instock-server.herokuapp.com/inventory/';

class EditInventoryPage extends Component {
  state = {
    inventoryData: [],
    itemName: "",
    description: "",
    category: "",
    stockStatus: "",
    quantity: "",
    warehouseName: "",
    id: "",
  };

  getInventory = () => {
    axios
      .get(siteInventory)
      .then((response) => {
        this.setState({
          inventoryData: response.data,
        });
      })
      .catch((err) => console.log(err));
  };

  getItem = () => {
    const id = this.props.match.params.id;
    axios
      .get(`${siteInventory}${id}`)
      .then((response) => {
        const item = response.data;
        this.setState({
          itemName: item.itemName,
          description: item.description,
          stockStatus: item.status,
          category: item.category,
          quantity: item.quantity,
          warehouseName: item.warehouseName,
          id: item.id,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.getInventory(id);
    this.getItem();
  }

  radioToggle = (event) => {
    if (event.target.value === "In Stock") {
      this.setState({
        radioToggle1: true,
        radioToggle2: false,
        stockStatus: true,
        instock: "In Stock",
      });
    } else {
      this.setState({
        radioToggle1: false,
        radioToggle2: true,
        stockStatus: false,
        instock: "Out of Stock",
        quantity: 0,
      });
    }
  };

  isItemValid = () => {
    if (this.state.itemName.length < 1) {
      return false;
    } else {
      return true;
    }
  };

  isDescriptionValid = () => {
    if (this.state.description.length < 1) {
      return false;
    } else {
      return true;
    }
  };

  isDropdownValid = () => {
    if (!this.state.category && !this.state.warehouseName) {
      return false;
    } else {
      return true;
    }
  };

  isFormValid = () => {
    if (!this.isItemValid()) {
      return false;
    }
    if (!this.isDescriptionValid()) {
      return false;
    }
    if (!this.isDropdownValid()) {
      return false;
    } else {
      return true;
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const id = this.props.match.params.id;
    if (this.isFormValid()) {
      axios.patch(`${siteInventory}${id}`, {
        warehouseName: event.target.warehouseName.value,
        itemName: event.target.itemName.value,
        description: event.target.description.value,
        category: event.target.category.value,
        id: this.state.id,
        status: this.state.instock,
        quantity: this.state.quantity,
      });
      alert("Edit Saved!");
      this.props.history.push("/inventory");
    }
  };

  render() {
    return (
      <>
        <div className="edit__container">
          <div className="edit__header">
            <Link to={"/inventory"}>
              <img className="back-arrow" src={back} alt="back arrow" />
            </Link>
            <h1 className="edit__header-title">Edit Inventory Item</h1>
          </div>

          <div className="invform__container">
            <form onSubmit={this.submitHandler} className="invform__form-all">
              <div className="invform__tblt-split">
                <div className="invform__details-container">
                  <div className="invform__details-contents">
                    <h2 className="invform__details-header">Item Details</h2>
                    <label className="invform__label" htmlFor="itemName">
                      Item Name
                    </label>
                    <input
                      type="text"
                      name="itemName"
                      placeholder="Item Name"
                      value={this.state.itemName}
                      onChange={this.handleChange}
                    ></input>
                    {!this.state.itemName && <ErrorMsg src={errorIcon} />}
                    <label className="invform__label" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      className="invform__input-description"
                      type="text"
                      placeholder="Please enter a brief description..."
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                    ></textarea>
                    {!this.state.description && <ErrorMsg src={errorIcon} />}
                    <label className="invform__label" htmlFor="category">
                      Category
                    </label>
                    <div className="invform__category-container">
                      <select
                        name="category"
                        onChange={this.handleChange}
                        value={this.state.category}
                      >
                        <option value="DEFAULT" disabled="disabled">
                          Please select
                        </option>

                        {this.state.inventoryData
                          .filter(
                            (value, index, self) =>
                              index ===
                              self.findIndex(
                                (t) => t.category === value.category
                              )
                          )
                          .map((data) => {
                            return (
                              <option key={data.id} value={data.category}>
                                {data.category}
                              </option>
                            );
                          })}
                      </select>
                      <img
                        className="invform__icon"
                        src={dropdown}
                        alt="dropdown arrow"
                      />
                      {!this.state.category && <ErrorMsg src={errorIcon} />}
                    </div>
                  </div>
                </div>
                <div className="invform__availability-contents">
                  <h2 className="invform__details-header">Item Availability</h2>
                  <label className="invform__label">Status</label>
                  <div className="invform__radio-container">
                    <div className="invform__radio-input">
                      <input
                        className="invform__radio-input--icon"
                        type="radio"
                        name="instock"
                        value="In Stock"
                        onChange={this.radioToggle}
                        checked={this.state.radioToggle1}
                      ></input>
                      <label
                        className="invform__radio-input--label"
                        htmlFor="status"
                      >
                        In stock
                      </label>
                    </div>
                    <div className="invform__radio-input">
                      <input
                        className="invform__radio-input--icon"
                        type="radio"
                        name="outofstock"
                        value="Out of Stock"
                        onChange={this.radioToggle}
                        checked={this.state.radioToggle2}
                      ></input>
                      <label
                        className="invform__radio-input--label"
                        htmlFor="status"
                      >
                        Out of stock
                      </label>
                    </div>
                  </div>
                  {this.state.stockStatus && (
                    <>
                      <label className="invform__label" htmlFor="qty">
                        Quantity
                      </label>
                      <input
                        placeholder="0"
                        name="quantity"
                        onChange={this.handleChange}
                        value={this.state.quantity}
                      ></input>
                    </>
                  )}

                  <label className="invform__label" htmlFor="warehouse">
                    Warehouse
                  </label>
                  <div className="invform__warehouse-container">
                    <select
                      name="warehouseName"
                      onChange={this.handleChange}
                      value={this.state.warehouseName}
                    >
                      <option value="DEFAULT">Please select</option>
                      {this.state.inventoryData
                        .filter(
                          (value, index, self) =>
                            index ===
                            self.findIndex(
                              (t) => t.warehouseName === value.warehouseName
                            )
                        )
                        .map((data) => {
                          return (
                            <option key={data.id} value={data.warehouseName}>
                              {data.warehouseName}
                            </option>
                          );
                        })}
                    </select>
                    <img
                      className="invform__icon"
                      src={dropdown}
                      alt="dropdown arrow"
                    />
                    {!this.state.warehouseName && <ErrorMsg src={errorIcon} />}
                  </div>
                </div>
              </div>
              <div className="invform__button-container">
                <Link to={"/inventory"} className="invform__button-link">
                  <button className="invform__button-cancel">Cancel</button>
                </Link>
                <button className="invform__button-submit" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default EditInventoryPage;
