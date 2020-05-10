import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHome from "./UserComponents/UserHome";

// Admin
import FooterPage from "./AdminComponents/Footer";
import CreateLogin from "./AdminComponents/CreateLogin";
import AdminMain from "./AdminComponents/AdminMain";
import ViewManager from "./AdminComponents/ViewStoreManagers";
import AddCategories from "./AdminComponents/AddCategories";
import ViewStats from "./AdminComponents/ViewStats";
import EditStoreManager from "./AdminComponents/EditStoreManager";

// User
import ProductList from "./UserComponents/ProductList";
import ProductDetails from "./UserComponents/ProductDetails";
import Cart from "./UserComponents/Cart/Cart";
import WishListMain from "./UserComponents/WishList/WishListMain";
import WishListItemsList from "./UserComponents/WishList/WishListItemsList";
import WishListHome from "./UserComponents/WishList/WishListHome";
import Modal from "./UserComponents/Modal";
import login from "./UserComponents/login";
import register from "./UserComponents/register";

// manager
import ManagerHome from "./ManagerComponents/ManagerHome";
import addItem from "./ManagerComponents/addItem";

function App() {
  return (
      <Router>

          <div>
              <ul className="navbar-nav mr-auto">

                  <li><Link to={'/'} className="nav-link"> User </Link></li>

                  <li><Link to={'/Admin'} className="nav-link">Admin</Link></li>
                  <li><Link to={'/Manager'} className="nav-link">Manager</Link></li>

              </ul>
          </div>
      {/*<UserHome/>*/}


      <br />

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
          <Route path="/Modal" component={Modal}/>
          <Route path="/login" component={login}/>
          <Route path="/register" component={register}/>

          {/*Manager*/}
          <Route path="/Manager" exact component={ManagerHome}/>
          <Route path="/AddItem" exact component={addItem}/>
          <br />
      </switch>
      <FooterPage/>
      </Router>
    );
}

export default App;
