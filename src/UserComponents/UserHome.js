import React, {Component} from "react";

import {Switch, Route} from 'react-router-dom';

import NavBar from "./NavBar";
import ProductList from "./ProductList";
import Product from "./Product";
import ProductDetails from "./ProductDetails";
import Cart  from "./Cart/Cart";
import Modal from "./Modal";
import store from './LoginHandler/store';
import { isAuth } from './LoginHandler/actions/authActions'
import PropTypes from "prop-types";

class UserHome extends Component{

    componentDidMount() {
        // Check if session cookie is present
        store.dispatch(isAuth());
    }

    static propTypes = {
        button: PropTypes.bool,
        isAuthenticated: PropTypes.bool,
    };

    render() {

        return (
            <React.Fragment>
                <NavBar/>
                <ProductList />
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