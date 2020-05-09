import React, {Component, useEffect, useState} from 'react';

import Titles  from "../Titles";
import CartColumns from './CartColumns';
import EmptyCart  from "./EmptyCart";
import {ProductConsumer} from "../../context";

import CartList from "./CartList";
import CartTotals from "./CartTotals"
import NavBar from "../NavBar";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Axios from "axios";

const mapStateToProps = ({ session}) => ({
    session
});

const Cart = ({session}) => {

    const [Cart, setCart] = useState([]);

    useEffect(() => {
        if(session.userId !== null){

            Axios.get('http://localhost:5000/api/cart/getCart', {params:{userId: session.userId}})
                .then(res => {
                    const cart = res.data;

                    let tempProducts = [];
                    cart.forEach(item => {
                        const singleItem = {...item};
                        tempProducts = [...tempProducts, singleItem];
                    });

                    setCart(tempProducts);
                })
        }

    }, []);

        if(session.username !== null){
            console.log(Cart)
            return (
                <section>
                    <NavBar />
                        {(Cart.length > 0) ? (
                                    <React.Fragment>
                                        <Titles name ="Your " title = "Cart">Cart</Titles>
                                        <CartColumns/>
                                        <CartList cart = {Cart}/>
                                        <CartTotals value={Cart}/>
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

export default connect(
    mapStateToProps
)(Cart);


// class Cart extends Component {
//
//     render() {
//
//         if(session.username !== undefined){
//             return (
//                 <section>
//                     <NavBar />
//                     <ProductConsumer>
//                         {value => {
//                             const {cart} = value;
//
//                             if(cart.length > 0){
//                                 return(
//                                     <React.Fragment>
//                                         <Titles name ="Your " title = "Cart">Cart</Titles>
//                                         <CartColumns/>
//                                         <CartList value = {value}/>
//                                         <CartTotals value={value}/>
//                                     </React.Fragment>
//                                 );
//                             } else {
//                                 return (
//                                     <EmptyCart/>
//                                 );
//                             }
//                         }}
//                     </ProductConsumer>
//                 </section>
//             );
//         } else {
//             return(
//                 <Redirect to="/login" />
//             );
//         }
//
//     }
// }