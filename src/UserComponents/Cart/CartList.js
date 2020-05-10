import React, {Component} from 'react';

import CartItem from './CartItem';

const CartList = (props) => {

    const cart = props.cart;


    return (
        <div className="container-fluid">
            {cart.map(item => {
                return <CartItem key = {item.id} item={item} value={cart}/>
            })}

        </div>
    );
}

export default CartList;







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