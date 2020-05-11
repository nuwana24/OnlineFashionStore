import React, {Component} from 'react';

import CartItem from './CartItem';
import {connect} from "react-redux";
import Axios from "axios";

const mapStateToProps = ({ session}) => ({
    session
});

const CartList = ({session, ...props}) => {

    const cart = props.cart;
    const {increment, decrement, removeItem} = props;
    return (
        <div className="container-fluid">
            {cart.map(item => {
                return <CartItem key = {item.id} item={item} increment={increment} decrement={decrement} removeItem={removeItem}/>
            })}

        </div>
    );
};

export default connect(
    mapStateToProps
)(CartList);







// export default function CartList(props) {
//
//     const {value} = props.cart;
//
//     console.log(value)
//     return (
//         <div className="container-fluid">
//             {/*{value.map(item => {*/}
//             {/*    return <CartItem key = {item.id} item={item} value={value}/>*/}
//             {/*})}*/}
//
//         </div>
//     );
// }