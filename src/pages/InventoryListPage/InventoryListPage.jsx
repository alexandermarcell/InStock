import React from "react";
import axios from "axios";
import InventoryList from "../../components/InventoryList/InventoryList";
import "./InventoryListPage.scss";

const siteInventory = 'https://alex-instock-server.herokuapp.com/inventory';

export default class InventoryListPage extends React.Component {
  state = {
    inventoryData: [],

    isOpen: false,
    selectedId: undefined,
  };

  openModal = (id) => {
    this.setState({
      inventoryData: this.state.inventoryData,
      isOpen: true,
      selectedId: id,
    });
  };

  closeModal = () => {
    this.setState({
      inventoryData: this.state.inventoryData,
      isOpen: false,
      selectedId: undefined,
    });
  };

  componentDidMount() {
    axios
      .get(siteInventory)
      .then((response) => {
        this.setState({
          inventoryData: response.data,
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate() {
    axios
      .get(siteInventory)
      .then((response) => {
        if (
          JSON.stringify(response.data) !==
          JSON.stringify(this.state.inventoryData)
        ) {
          this.setState({
            inventoryData: response.data,
            isOpen: this.state.isOpen,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <div className="page-content">
          <InventoryList
            inventoryData={this.state.inventoryData}
            closeModal={this.closeModal}
            openModal={this.openModal}
            isOpen={this.state.isOpen}
            selectedId={this.state.selectedId}
            key={this.state.inventoryData.id}
          />
        </div>
      </>
    );
  }
}
