import React, {Component} from "react";

import {Switch, Route} from 'react-router-dom';

import NavBar from "./NavBar";
import ProductList from "./ProductList";
import Product from "./Product";
import ProductDetails from "./ProductDetails";
import Cart  from "./Cart/Cart";
import Modal from "./Modal";

class UserHome extends Component{

    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <Switch>
                    <Route exact path="/" component={ProductList}/>
                    <Route path="/ProductDetails" component={ProductDetails}/>
                    <Route path="/Cart" component={Cart}/>
                </Switch>
                <Modal/>
            </React.Fragment>
        );
    }
}

export default UserHome;