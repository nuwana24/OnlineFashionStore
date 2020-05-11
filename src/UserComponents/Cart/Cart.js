import React, { useEffect, useState} from 'react';

import Titles  from "../Titles";
import CartColumns from './CartColumns';
import EmptyCart  from "./EmptyCart";

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

    const increment = (productId) => {
        const item = {
            userId : session.userId,
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

                    setCart(tempProducts);
                }
            })
    };

    const decrement = (productId) => {
        const item = {
            userId : session.userId,
            productId: productId
        };

        Axios.post('http://localhost:5000/api/cart/decrement', item)
            .then(res=>{
                if(res.status === 200){
                    console.log('Decremented');
                }
            })
    };

    const removeItem = (productId) => {

        Axios.get('http://localhost:5000/api/cart/removeItem', {params:{userId: session.userId, productId: productId}});
    }

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

            return (
                <section>
                    {/*<NavBar />*/}
                        {(Cart.length > 0) ? (
                                    <React.Fragment>
                                        <Titles name ="Your " title = "Cart">Cart</Titles>
                                        <CartColumns/>
                                        <CartList cart = {Cart} increment={increment} decrement={decrement} removeItem={removeItem}/>
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