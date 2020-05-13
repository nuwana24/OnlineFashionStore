import React, { useEffect, useState, Component} from 'react';

import Titles  from "../Titles";
import CartColumns from './CartColumns';
import EmptyCart  from "./EmptyCart";

import CartList from "./CartList";
import CartTotals from "./CartTotals"
import NavBar from "../NavBar";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import Axios from "axios";

const mapStateToProps = ({ session}) => ({
    session
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
        discount: 0
    };

    componentDidMount() {
        if(this.props.session.userId !== null){
            this.getItems();
        }
    }

    getItems = () => {
        Axios.get('http://localhost:5000/api/cart/getCart', {params:{userId: this.props.session.userId}})
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
        this.setState({
            total : 0,
            discount : 0
        });

        this.state.Cart.forEach(item => {
            this.setState({
                total : this.state.total + (item.price * item.quantity),
                discount : this.state.discount + (item.discount * item.quantity)
            })
        })

    };

    increment = (productId) => {
        const item = {
            userId : this.props.session.userId,
            productId: productId
        };

        Axios.post('http://localhost:5000/api/cart/increment', item)
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
                        Cart : tempProducts
                    });

                    this.updateStates();
                }
            });
    };

    decrement = (productId) => {

        const product = this.state.Cart.find(item => item.id === productId );

        if(Number(product.quantity) > 1){

            const item = {
                userId : this.props.session.userId,
                productId: productId
            };

            Axios.post('http://localhost:5000/api/cart/decrement', item)
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
                            Cart : tempProducts
                        })

                        //this.updateStates();
                    }
                });
        }

    };

    removeItem = (productId) => {

        Axios.get('http://localhost:5000/api/cart/removeItem', {params:{userId: this.props.session.userId, productId: productId}});

        this.getItems()

    };

    render() {

        if(this.props.session.username !== null){
            return (
                <section>
                    <NavBar />
                    {(this.state.Cart.length > 0) ? (
                                    <React.Fragment>
                                        <Titles name ="Your " title = "Cart">Cart</Titles>
                                        <CartColumns/>
                                        <CartList cart = {this.state.Cart} increment={this.increment} decrement={this.decrement} removeItem={this.removeItem}/>
                                        {/*<CartTotals cart={this.state.Cart}/>*/}
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                                                    <h5>
                                                        <span className="text-title">Sub Total: </span>
                                                        <strong>$ {this.state.total}</strong>
                                                    </h5>
                                                    <h5>
                                                        <span className="text-title">Discount: </span>
                                                        <strong>$ {this.state.discount}</strong>
                                                    </h5>
                                                    <h5>
                                                        <span className="text-title">Total: </span>
                                                        <strong>$ {this.state.total - this.state.discount}</strong>
                                                    </h5>

                                                    <Link to='/'>
                                                        <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                                                            <button className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button"
                                                                    o>Clear Cart</button>
                                                            <button className="btn btn-outline-info ml-3 text-uppercase mb-3 px-5" type="button"
                                                            >Check Out</button>
                                                        </div>

                                                    </Link>
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

export default connect(
    mapStateToProps
)(Cart);