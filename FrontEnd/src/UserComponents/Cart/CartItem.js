import React, {Component} from 'react';
import {connect} from "react-redux";

const mapStateToProps = ({ session}) => ({
    session
});

class CartItem extends Component{

    state = {
        quantity: 0
    };

    componentDidMount() {
        this.setState({
            quantity : this.props.item.quantity
        })
    }

    increment = () => {

        this.setState({
            quantity : this.state.quantity + 1
        });

        this.props.increment(this.props.item.id)
    };

    decrement = () => {

        if(this.state.quantity > 1){

            this.setState({
                quantity : this.state.quantity - 1
            });

            this.props.decrement(this.props.item.id)
        }
    };

    render() {

        return (
        <div className="row my-2 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img src={this.props.item.image} style={{width: '5rem', height: '5rem'}} className="img-fluid" alt="product "/>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">Product: </span>{this.props.item.name}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">Price: </span>{this.props.item.price}
            </div>
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                     <div>
                         <span className="btn btn-black mx-1" onClick={this.decrement}>-</span>
                         <span className="btn btn-black mx-1">{this.state.quantity}</span>
                         <span className="btn btn-black mx-1" onClick={this.increment}>+</span>
                     </div>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon">
                    <i className="fas fa-trash" onClick={() => this.props.removeItem(this.props.item.id)}/>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <strong>{((Number(this.props.item.price) - Number(this.props.item.discount)) * this.state.quantity)}</strong>
            </div>
        </div>
    );
    }
}

export default connect(
    mapStateToProps
)(CartItem);