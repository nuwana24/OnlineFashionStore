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

        console.log(this.props.session);
        return (
        <div className="row my-2 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img  style={{width: '5rem', height: '5rem'}} className="img-fluid" alt="product "/>
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

// const CartItem = ({session ,...props}) => {
//
//     const {id,name, price, quantity, discount} =  props.item;
//     const {increment, decrement, removeItem} = props;
//
//     return (
//         <div className="row my-2 text-capitalize text-center">
//             <div className="col-10 mx-auto col-lg-2">
//                 <img  style={{width: '5rem', height: '5rem'}} className="img-fluid" alt="product "/>
//             </div>
//             <div className="col-10 mx-auto col-lg-2">
//                 <span className="d-lg-none">Product: </span>{name}
//             </div>
//             <div className="col-10 mx-auto col-lg-2">
//                 <span className="d-lg-none">Price: </span>{price}
//             </div>
//             <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
//                 <div className="d-flex justify-content-center">
//                      <div>
//                          <span className="btn btn-black mx-1" onClick={() => decrement(id)}>-</span>
//                          <span className="btn btn-black mx-1">{quantity}</span>
//                          <span className="btn btn-black mx-1" onClick={() => increment(id)}>+</span>
//                      </div>
//                 </div>
//             </div>
//             <div className="col-10 mx-auto col-lg-2">
//                 <div className="cart-icon">
//                     <i className="fas fa-trash" onClick={() => removeItem(id)}/>
//                 </div>
//             </div>
//             <div className="col-10 mx-auto col-lg-2">
//                 <strong>{((Number(price) - Number(discount)) * Number(quantity))}</strong>
//             </div>
//         </div>
//     );
// };

export default connect(
    mapStateToProps
)(CartItem);










// export default function CartItem({item,value}) {
//
//     const {id,title, img, price, total, count} =  item;
//     const {increment, decrement, removeItem } = value;
//
//     return (
//         <div className="row my-2 text-capitalize text-center">
//             <div className="col-10 mx-auto col-lg-2">
//                 <img src={img} style={{width: '5rem', height: '5rem'}} className="img-fluid" alt="product "/>
//             </div>
//             <div className="col-10 mx-auto col-lg-2">
//                 <span className="d-lg-none">Product: </span>{title}
//             </div>
//             <div className="col-10 mx-auto col-lg-2">
//                 <span className="d-lg-none">Price: </span>{price}
//             </div>
//             <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
//                 <div className="d-flex justify-content-center">
//                     <div>
//                         <span className="btn btn-black mx-1" onClick={() => decrement(id)}>-</span>
//                         <span className="btn btn-black mx-1">{count}</span>
//                         <span className="btn btn-black mx-1" onClick={() => increment(id)}>+</span>
//                     </div>
//                 </div>
//             </div>
//             <div className="col-10 mx-auto col-lg-2">
//                 <div className="cart-icon" onClick={() => removeItem(id)}>
//                     <i className="fas fa-trash"/>
//                 </div>
//             </div>
//             <div className="col-10 mx-auto col-lg-2">
//                 <srong>Total: ${total}</srong>
//             </div>
//         </div>
//     );
// }
