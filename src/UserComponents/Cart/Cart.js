import React, {Component} from 'react';

import Titles  from "../Titles";
import CartColumns from './CartColumns';
import EmptyCart  from "./EmptyCart";
import {ProductConsumer} from "../../context";

import CartList from "./CartList";
import CartTotals from "./CartTotals"
import NavBar from "../NavBar";

class Cart extends Component {
    render() {
        return (
            <section>
            <NavBar />
                <ProductConsumer>
                    {value => {
                        const {cart} = value;

                        if(cart.length > 0){
                            return(
                                <React.Fragment>
                                    <Titles name ="Your " title = "Cart">Cart</Titles>
                                    <CartColumns/>
                                    <CartList value = {value}/>
                                    <CartTotals value={value}/>
                                </React.Fragment>
                            );
                        } else {
                            return (
                                <EmptyCart/>
                            );
                        }
                    }}
                </ProductConsumer>
            </section>
        );
    }
}

export default Cart;