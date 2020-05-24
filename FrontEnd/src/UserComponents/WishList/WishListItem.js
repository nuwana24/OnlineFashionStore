import React, {Component} from 'react';

import styled from 'styled-components';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = ({ session}) => ({
    session
});

class WishListItem extends Component {

    addToCartHandler = (id, name, price, discount) => {

        if(this.props.session.userId !== null){
            const item = {
                userId: this.props.session.userId,
                productId: id,
                name: name,
                price: price,
                qty: 1,
                discount: discount
            };
            console.log('WishListItem addToCart')
            this.props.addToCart(item)
        }

    };

    render() {

        const {id, name,image, price, description, material, discount } = this.props.WishListItem;

        const removeItem = this.props.removeWishList;

        return (
            <ProductWrapper className = "col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="cardView">

                    <div className="img-container p-5 " >
                        <Link to={{pathname: 'ProductDetails', item:{id, name, image, price, description, material}}}>
                            <img src={image} alt = "product" className="card-img"/>
                        </Link>
                        <div style={{display: 'flex', justifyContent: 'left', alignItems: 'center', height: '8vh'}}>
                            <button style={{position: "absolute", right: 40}} onClick={() => this.addToCartHandler(id, name, price, discount)}>
                                <i className="fas fa-cart-plus"/>
                            </button>
                            <button style={{position: "absolute", right: 20}} onClick={() => {
                                removeItem(id)
                            }} style={{color: "red"}}>
                                <i className="fas fa-trash"/>
                            </button>
                        </div>
                    </div>

                    <div className="card-footer d-flex justify-content-between">
                        <p className="align-self-center mb-0">
                            {name }
                        </p>
                    </div>
                </div>
            </ProductWrapper>

        );
    }


}

const ProductWrapper = styled.div`
.card {
      border-color: transparent;
      transition: all 1s linear;
    }
    .card-footer {
      background: transparent;
      border-top: transparent;
      transition: all 1s linear;
    }
    &:hover {
      .card {
        border: 0.04rem solid rgba(0,0,0,0.2);
        box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2)
      }
      .card-footer {
        background: rgba(247, 247, 247);
      }
    }
    .img-container {
      position: relative;
      overflow: hidden;
    }
    .card-img-top {
      transition: all 1s linear;
    }
    .img-container:hover .card-img-top{
      transform: scale(1.2);
    }
    .cart-btn{
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 0.2 rem 0.4rem;
      background: var(--lightBlue);
      border: none;
      color:var(--mainWhite);
      font-size: 1.4rem;
      border-radius: 0.5rem 0 0 0;
      transform: translate(100%, 100%);
      transition: all 1s linear;
    }
    .img-container: hover .cart-btn {
      transform: translate(0,0);
    }
    .cart-btn:hover{
      color: var(--mainBlue);
      cursor: pointer;
    }
`

export default connect(mapStateToProps)(WishListItem);

