import "./AddInventoryForm.scss";
import axios from "axios";
import { Component } from "react";
import dropdown from "../../assets/icons/arrow_drop_down-24px.svg";
import { Link } from "react-router-dom";
import errorIcon from "../../assets/icons/error-24px.svg";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";

class AddInventoryForm extends Component {
  state = {
    inventoryData: [],
    itemNameCheck: false,
    descriptionCheck: false,
    quantityCheck: false,
    quantityValue: false,
    stockStatus: true,
    warehouseNameCheck: false,
    categoryCheck: false,
    radioToggle1: true,
    radioToggle2: false,
    instock: "In Stock",
    quantity: 0,
  };

  componentDidMount() {
    axios
      .get("http://localhost:8080/inventory")
      .then((response) => {
        this.setState({
          inventoryData: response.data,
        });
      })
      .catch((err) => console.log(err));
  }

  radioToggle = (event) => {
    console.log(event.target.value);
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
        quantity: "0",
        instock: "Out of Stock",
      });
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = (event) => {
    event.preventDefault();

    if (this.state.instock === "In Stock") {
      if (event.target.itemName.value === "") {
        this.setState({ itemNameCheck: true });
      } else if (event.target.description.value === "") {
        this.setState({ descriptionCheck: true });
      } else if (event.target.category.value === "") {
        this.setState({ categoryCheck: true });
      } else if (event.target.quantity.value === "") {
        this.setState({ quantityCheck: true, quantityValue: false });
      } else if (event.target.quantity.value < 0) {
        this.setState({ quantityValue: true, quantityCheck: false });
      } else if (event.target.warehouseName.value === "") {
        this.setState({ warehouseNameCheck: true });
      } else {
        alert("Item Added!");

        this.setState({
          itemNameCheck: false,
          descriptionCheck: false,
          quantityCheck: false,
          quantityValue: false,
          stockStatus: true,
        });

        axios.post("http://localhost:8080/inventory", {
          warehouseName: event.target.warehouseName.value,
          itemName: event.target.itemName.value,
          description: event.target.description.value,
          category: event.target.category.value,
          status: this.state.instock,
          quantity: event.target.quantity.value,
        });
      }
    } else {
      if (event.target.itemName.value === "") {
        this.setState({ itemNameCheck: true });
      } else if (event.target.description.value === "") {
        this.setState({ descriptionCheck: true });
      } else if (event.target.category.value === "") {
        this.setState({ categoryCheck: true });
      } else if (event.target.warehouseName.value === "") {
        this.setState({ warehouseNameCheck: true });
      } else {
        alert("Item Added!");

        this.setState({
          itemNameCheck: false,
          descriptionCheck: false,
          quantityCheck: false,
          quantityValue: false,
          stockStatus: true,
        });

        axios.post("http://localhost:8080/inventory", {
          warehouseName: event.target.warehouseName.value,
          itemName: event.target.itemName.value,
          description: event.target.description.value,
          category: event.target.category.value,
          status: this.state.instock,
          quantity: this.state.quantity,
        });
      }
    }
  };

  render() {
    return (
      <>
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
                    onChange={this.handleChange}
                    value={this.state.itemName}
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
                      onChange={this.handleChange}
                      value={this.state.category}
                      defaultValue={"DEFAULT"}
                      name="category"
                    >
                      <option value="DEFAULT" disabled="disabled">
                        Please select
                      </option>

                      {this.state.inventoryData
                        .filter(
                          (value, index, self) =>
                            index ===
                            self.findIndex((t) => t.category === value.category)
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
                    <input placeholder="0" name="quantity"></input>
                  </>
                )}

                {this.state.quantityCheck && <ErrorMsg src={errorIcon} />}
                {this.state.quantityValue && <ErrorMsg src={errorIcon} />}

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
                + Add Item
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default AddInventoryForm;
