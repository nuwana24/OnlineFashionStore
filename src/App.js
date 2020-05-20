import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHome from "./FrontEnd/UserComponents/UserHome";

// Admin
import AdminAndManagerLogin from "./FrontEnd/AdminComponents/Admin&ManagerLogin/adminAndManagerLogin";
import FooterPage from "./FrontEnd/AdminComponents/Footer";
import CreateLogin from "./FrontEnd/AdminComponents/CreateLogin";
import AdminMain from "./FrontEnd/AdminComponents/AdminMain";
import ViewManager from "./FrontEnd/AdminComponents/ViewStoreManagers";
import AddCategories from "./FrontEnd/AdminComponents/AddCategories";
import ViewStats from "./FrontEnd/AdminComponents/ViewStats";
import EditStoreManager from "./FrontEnd/AdminComponents/EditStoreManager";
import EditCategories from "./FrontEnd/AdminComponents/EditCategories";
import ViewCategory from "./FrontEnd/AdminComponents/ViewCategories";

// User
import ProductList from "./FrontEnd/UserComponents/ProductList";
import ProductDetails from "./FrontEnd/UserComponents/ProductDetails";
import Cart from "./FrontEnd/UserComponents/Cart/Cart";
import CartMain from "./FrontEnd/UserComponents/Cart/CartMain";
import WishListMain from "./FrontEnd/UserComponents/WishList/WishListMain";
import WishListItemsList from "./FrontEnd/UserComponents/WishList/WishListItemsList";

import Modal from "./FrontEnd/UserComponents/Modal";
import login from "./FrontEnd/UserComponents/login";
import register from "./FrontEnd/UserComponents/register";

// manager
import ManagerHome from "./FrontEnd/ManagerComponents/ManagerHome";
import addItem from "./FrontEnd/ManagerComponents/addItem";
import ItemList from "./FrontEnd/ManagerComponents/ItemList";
import editItem from "./FrontEnd/ManagerComponents/editItem";
import addDiscount from "./FrontEnd/ManagerComponents/addDiscount";
import discountPopUp from "./FrontEnd/ManagerComponents/discountPopUp";
import {AuthRoute, AuthRouteAdmin, AuthRouteManager, ProtectedRoute} from "./FrontEnd/UserComponents/util/routes";





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
          <Route path="/Modal" component={Modal}/>
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
