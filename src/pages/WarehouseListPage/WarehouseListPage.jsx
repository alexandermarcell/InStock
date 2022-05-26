import axios from "axios";
import "./WarehouseListPage.scss";
import { Component } from "react";
import { WarehouseSearch } from "../../components/Searchbar/Searchbar";
import WarehouseItem from "../../components/WarehouseItem/WarehouseItem";

const siteWarehouse = 'https://alex-instock-server.herokuapp.com/warehouse';

export default class WarehouseListPage extends Component {
  state = {
    warehouses: [],
    isOpen: false,
    selectedId: undefined,
  };

  openModal = (id) => {
    this.setState({
      inventoryData: this.state.warehouses,
      isOpen: true,
      selectedId: id,
    });
  };

  closeModal = () => {
    this.setState({
      inventoryData: this.state.warehouses,
      isOpen: false,
      selectedId: undefined,
    });
  };

  getWarehouses = () => {
    axios.get(siteWarehouse).then((response) => {
      this.setState({
        warehouses: response.data,
      });
    });
  };

  componentDidMount() {
    this.getWarehouses();
  }

  componentDidUpdate() {
    axios
      .get(siteWarehouse)
      .then((response) => {
        if (
          JSON.stringify(response.data) !==
          JSON.stringify(this.state.warehouses)
        ) {
          this.setState({
            warehouses: response.data,
            isOpen: this.state.isOpen,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <div className="warehouse">
          <WarehouseSearch />
          <WarehouseItem
            warehouses={this.state.warehouses}
            closeModal={this.closeModal}
            openModal={this.openModal}
            isOpen={this.state.isOpen}
            selectedId={this.state.selectedId}
          />
        </div>
      </>
    );
  }
}
