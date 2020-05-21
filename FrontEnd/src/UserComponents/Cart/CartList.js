import React, {Component} from 'react';

import CartItem from './CartItem';
import {connect} from "react-redux";
import Axios from "axios";

const mapStateToProps = ({ session}) => ({
    session
});

class CartList extends Component{

    render() {
        return (
            <div className="container-fluid">
                {this.props.cart.map(item => {
                    return <CartItem key = {item.id} item={item} increment={this.props.increment} decrement={this.props.decrement} removeItem={this.props.removeItem}/>
            })}

        </div>
        );
    }
}

export default connect(
    mapStateToProps
)(CartList);