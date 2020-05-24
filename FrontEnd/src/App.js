import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHome from "./UserComponents/UserHome";

// Admin
import AdminAndManagerLogin from "./AdminComponents/Admin&ManagerLogin/adminAndManagerLogin";
import FooterPage from "./AdminComponents/Footer";
import CreateLogin from "./AdminComponents/CreateLogin";
import AdminMain from "./AdminComponents/AdminMain";
import ViewManager from "./AdminComponents/ViewStoreManagers";
import AddCategories from "./AdminComponents/AddCategories";
import ViewStats from "./AdminComponents/ViewStats";
import EditStoreManager from "./AdminComponents/EditStoreManager";
import EditCategories from "./AdminComponents/EditCategories";
import ViewCategory from "./AdminComponents/ViewCategories";
// User
import ProductList from "./UserComponents/ProductList";
import ProductDetails from "./UserComponents/ProductDetails";
import Cart from "./UserComponents/Cart/Cart";
import CartMain from "./UserComponents/Cart/CartMain";
import WishListMain from "./UserComponents/WishList/WishListMain";
import WishListItemsList from "./UserComponents/WishList/WishListItemsList";

import login from "./UserComponents/login";
import register from "./UserComponents/register";

// manager
import ManagerHome from "./ManagerComponents/ManagerHome";
import addItem from "./ManagerComponents/addItem";
import ItemList from "./ManagerComponents/ItemList";
import editItem from "./ManagerComponents/editItem";
import addDiscount from "./ManagerComponents/addDiscount";
import discountPopUp from "./ManagerComponents/discountPopUp";
import {AuthRoute, AuthRouteAdmin, AuthRouteManager, ProtectedRoute} from "./UserComponents/util/routes";





function App() {
  return (
      <Router>

      <switch>

          {/*Admin*/}

          <Route path="/AdLog" exact component={AdminAndManagerLogin} />
          <ProtectedRoute path="/Admin" component={AdminMain} />
          <Route path="/CreateLogin" exact component={CreateLogin}/>
          <Route path="/ViewManager" exact component={ViewManager}/>
          <Route path="/EditManager/:id" exact component={EditStoreManager}/>
          <Route path="/EditCategory/:id" exact component={EditCategories} />
          <Route path="/AddCategory" exact component={AddCategories}/>
          <Route path="/ViewStats" exact component={ViewStats}/>
          <Route path="/ViewCategory" exact component={ViewCategory}/>

          {/*User*/}
          <Route exact path="/" component={UserHome} />
          <Route exact path="/s" exact component={ProductList}/>
          <Route path="/ProductDetails" component={ProductDetails}/>
          <Route path="/Cart" component={CartMain}/>
          <Route path="/WishListMain"component={WishListMain} />
          <Route path="/WishListItemList" component={WishListItemsList}/>
          <Route path="/login" component={login}/>
          <Route path="/register" component={register}/>

          {/*Manager*/}
          <ProtectedRoute path="/Manager" exact component={ManagerHome}/>
          <Route path="/AddItem" exact component={addItem}/>
          <Route path="/itemList" exact component={ItemList}/>
          <Route path="/editItem/:id" exact component={editItem}/>
          <Route path="/addDiscount" exact component={addDiscount}/>
          <Route path="/discountPopUp/:id" exact component={discountPopUp}/>

          <br />
      </switch>
      <FooterPage id='footer' />
      </Router>
    );
}

export default App;
