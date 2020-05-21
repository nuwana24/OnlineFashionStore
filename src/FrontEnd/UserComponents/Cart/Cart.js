import React, { useEffect, useState, Component} from 'react';

import Titles  from "../Titles";
import CartColumns from './CartColumns';
import EmptyCart  from "./EmptyCart";

import CartList from "./CartList";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import Axios from "axios";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

const mapStateToProps = ({ session, history}) => ({
    session, history
});

class Cart extends Component {

    constructor() {
        super();
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    state = {
        Cart: [],
        total : 0,
        discount: 0,
        redirect : false
    };

    componentDidMount() {
        if(this.props.session.userId !== null){
            this.getItems();
        }
    }

    getItems = () => {
        Axios.get('http://localhost:8000/api/cart/getCart', {params:{userId: this.props.session.userId}})
            .then(res => {
                const cart = res.data;

                let tempProducts = [];
                cart.forEach(item => {
                    const singleItem = {...item};
                    tempProducts = [...tempProducts, singleItem];
                });

                this.setState({
                    Cart : tempProducts
                });

                 this.updateStates();
            })
    };

    updateStates = () => {

        let total = 0;
        let discount = 0;

        this.state.Cart.forEach(item => {
            total = total + (item.price * item.quantity);
            discount = discount + (item.discount * item.quantity);
        });

        this.setState({
            total : total,
            discount : discount
        });

    };

    increment = (productId) => {
        const item = {
            userId : this.props.session.userId,
            productId: productId
        };

        let price = this.state.Cart.find(item => item.id === productId ).price;
        let discount = this.state.Cart.find(item => item.id === productId ).discount;

        Axios.post('http://localhost:8000/api/cart/increment', item)
            .then(res=>{
                if(res.status === 200){
                    console.log('Incremented');
                    const cart = res.data;

                    let tempProducts = [];
                    cart.forEach(item => {
                        const singleItem = {...item};
                        tempProducts = [...tempProducts, singleItem];
                    });

                    this.setState({
                        Cart : tempProducts,
                        total : this.state.total + Number(price),
                        discount: this.state.discount + Number(discount)
                    });
                }
            });
    };

    decrement = (productId) => {

            const item = {
                userId : this.props.session.userId,
                productId: productId
            };

            let price = this.state.Cart.find(item => item.id === productId ).price;
            let discount = this.state.Cart.find(item => item.id === productId ).discount;

            Axios.post('http://localhost:8000/api/cart/decrement', item)
                .then(res=>{
                    if(res.status === 200){
                        console.log('Decremented');

                        const cart = res.data;

                        let tempProducts = [];
                        cart.forEach(item => {
                            const singleItem = {...item};
                            tempProducts = [...tempProducts, singleItem];
                        });

                        this.setState({
                            Cart : tempProducts,
                            total : this.state.total - Number(price),
                            discount: this.state.discount - Number(discount)
                        });

                    }
                });

    };

    removeItem = (productId) => {

        Axios.get('http://localhost:8000/api/cart/removeItem', {params:{userId: this.props.session.userId, productId: productId}});

        this.getItems()

    };

    clearCart = () => {

        confirmAlert({
            title: 'Clear Cart',
            message: 'Are you sure to clear the Cart?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {Axios.get('http://localhost:8000/api/cart/clearCart', {params:{userId: this.props.session.userId}});
                                    this.setState({
                                        redirect : true
                                    })}
                },
                {
                    label: 'No'
                }
            ]
        })
    };

    checkout= () => {
        const user = {
            userId : this.props.session.userId,
            username : this.props.session.username,
            Cart : this.state.Cart
        };

        confirmAlert({
            title: 'Checkout',
            message: 'Place the Order?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {Axios.post('http://localhost:8000/api/cart/checkout', user);
                        this.setState({
                            redirect : true
                        })}
                },
                {
                    label: 'No'
                }
            ]
        })
    };

    render() {
        let total = this.state.total;
        let discount = this.state.discount;

        if (this.state.redirect){
            return (
                <Redirect to='/'/>
            )
        } else {
            if(this.props.session.username !== null){
                return (
                    <section>
                        {(this.state.Cart.length > 0) ? (
                            <React.Fragment>
                                <Titles name ="Your " title = "Cart">Cart</Titles>
                                <CartColumns/>
                                <CartList cart = {this.state.Cart} increment={this.increment} decrement={this.decrement} removeItem={this.removeItem}/>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                                            <h5>
                                                <span className="text-title">Sub Total: </span>
                                                <strong>$ {total}</strong>
                                            </h5>
                                            <h5>
                                                <span className="text-title">Discount: </span>
                                                <strong>$ {discount}</strong>
                                            </h5>
                                            <h5>
                                                <span className="text-title">Total: </span>
                                                <strong>$ {total - discount}</strong>
                                            </h5>


                                            <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                                                <button className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button" onClick={this.clearCart}>Clear Cart</button>
                                                <button className="btn btn-outline-info ml-3 text-uppercase mb-3 px-5" type="button" onClick={this.checkout}>Check Out</button>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ) : (
                            <EmptyCart/>
                        )
                        }
                    </section>
                );
            } else {
                return(
                    <Redirect to="/login" />
                );
            }    
        }
        
    }
}

export default connect(
    mapStateToProps
)(Cart);