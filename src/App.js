import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHome from "./UserComponents/UserHome";
import NavBar from "./AdminComponents/NavBar";
import Navbar from "./UserComponents/NavBar";
import FooterPage from "./AdminComponents/Footer";
import CreateLogin from "./AdminComponents/CreateLogin";
import AdminMain from "./AdminComponents/AdminMain";
import ViewManager from "./AdminComponents/ViewStoreManagers";
import AddCategories from "./AdminComponents/AddCategories";
import ViewStats from "./AdminComponents/ViewStats";
import EditStoreManager from "./AdminComponents/EditStoreManager";
import ProductList from "./UserComponents/ProductList";
import ProductDetails from "./UserComponents/ProductDetails";
import Cart from "./UserComponents/Cart/Cart";

import WishListMain from "./UserComponents/WishList/WishListMain";
import WishListItemsList from "./UserComponents/WishList/WishListItemsList";
import WishListHome from "./UserComponents/WishList/WishListHome";


function App() {
  return (
      <Router>

          <div>
              <ul className="navbar-nav mr-auto">
                  <li><Link to={'/'} className="nav-link"> User </Link></li>

                  <li><Link to={'/Admin'} className="nav-link">Admin</Link></li>
                  {/*<li><Link to={'/about'} className="nav-link">About</Link></li>*/}
              </ul>
          </div>
      {/*<UserHome/>*/}


      <br />
      <Navbar/>
      <switch>

          {/*Admin*/}

          <Route path="/Admin" exact component={AdminMain}/>
          <Route path="/CreateLogin" exact component={CreateLogin}/>
          <Route path="/ViewManager" exact component={ViewManager}/>
          <Route path="/EditManager" exact component={EditStoreManager}/>
          <Route path="/AddCategory" exact component={AddCategories}/>
          <Route path="/ViewStats" exact component={ViewStats}/>

          {/*User*/}
          {/*<Route path="/UserHome" component={UserHome} />*/}
          <Route exact path="/" exact component={ProductList}/>
          <Route path="/ProductDetails" component={ProductDetails}/>
          <Route path="/Cart" component={Cart}/>
          <Route path="/WishListMain"component={WishListMain} />
          <Route path="/WishListItemList" component={WishListItemsList}/>
          <Route path="/WishListHome" component={WishListHome}/>
          <br />
      </switch>
      <FooterPage/>
      </Router>
    );
}

export default App;
