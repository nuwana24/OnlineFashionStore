import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHome from "./UserComponents/UserHome";
import NavBar from "./AdminComponents/NavBar";
import FooterPage from "./AdminComponents/Footer";
import CreateLogin from "./AdminComponents/CreateLogin";
import AdminMain from "./AdminComponents/AdminMain";
import ViewManager from "./AdminComponents/ViewStoreManagers";
import AddCategories from "./AdminComponents/AddCategories";
import ViewStats from "./AdminComponents/ViewStats";
import EditStoreManager from "./AdminComponents/EditStoreManager";
import ProductList from "./UserComponents/ProductList";
import ProductDetails from "./UserComponents/ProductDetails";
import Cart from "./UserComponents/Cart";

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
      <switch>

          {/*Admin*/}

          <Route path="/Admin" exact component={AdminMain}/>
          <Route path="/CreateLogin" exact component={CreateLogin}/>
          <Route path="/ViewManager" exact component={ViewManager}/>
          <Route path="/EditManager" exact component={EditStoreManager}/>
          <Route path="/AddCategory" exact component={AddCategories}/>
          <Route path="/ViewStats" exact component={ViewStats}/>

          {/*User*/}
          <Route path="/" exact component={UserHome} />
          <Route exact path="/ProductList" component={ProductList}/>
          <Route path="/ProductDetails" component={ProductDetails}/>
          <Route path="/Cart" component={Cart}/>
          <br />
      </switch>
      <FooterPage/>
      </Router>
    );
}

export default App;
