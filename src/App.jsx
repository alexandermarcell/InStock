import "./App.scss";
import PageHeader from "./components/PageHeader/PageHeader";
import EditWarehousePage from "./pages/EditWarehousePage/EditWarehousePage";
import InventoryItemDetails from "./pages/InventoryItemDetails/InventoryItemDetails";
import AddWarehousePage from "./pages/AddWarehousePage/AddWarehousePage";
import InventoryListPage from "./pages/InventoryListPage/InventoryListPage";
import WarehouseListPage from "./pages/WarehouseListPage/WarehouseListPage";
import WarehouseDetailsPage from "./pages/WarehouseDetailsPage/WarehouseDetailsPage";
import AddInventoryPage from "./pages/AddInventoryPage/AddInventoryPage";
import EditInventoryPage from "./pages/EditInventoryPage/EditInventoryPage";
import PageFooter from "./components/PageFooter/PageFooter";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <PageHeader />
        <div className="padder"></div>
        <Switch>
          <Route path="/" exact component={WarehouseListPage} />
          <Route path="/warehouse/:id" component={WarehouseDetailsPage} />
          <Route path="/warehouseAdd" component={AddWarehousePage} />
          <Route path="/warehouseEdit/:id" component={EditWarehousePage} />
          <Route path="/inventory" exact component={InventoryListPage} />
          <Route path="/inventory/:id" component={InventoryItemDetails} />
          <Route path="/inventoryAdd" component={AddInventoryPage} />
          <Route path="/inventoryEdit/:id" component={EditInventoryPage} />
        </Switch>
        <PageFooter />
      </div>
    </Router>
  );
}

export default App;

