import React from 'react';

import styled from 'styled-components';
import {Card} from "react-bootstrap";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import Axios from "axios";

const mapStateToProps = ({ session}) => ({
    session
});

const Product = ({session, ...props}) =>  {

    const {_id, name, image, category,price, description,quantity,size,meterial,discount} = props.products;
    const material = meterial;
    const details = {
        userId: session.userId,
        id: _id,
        name : name,
        img : image,
        price : price,
        description : description,
        meterial : meterial
    };


    const addToCartHandler = () => {

        if(session.userId !== null){
            const item = {
                userId: session.userId,
                productId: _id,
                name: name,
                // img: image,
                price: price,
                qty: 1,
                discount: discount
            };

            props.addToCart(item)
        } else {
            confirmAlert({
                title: 'Login',
                message: 'Please login',
                buttons: [
                    {
                        label: 'Ok',

                    }
                ]
            })
        }

    };

    const addToWishListHandler = () =>{

        if(session.userId !== null) {
            const item = {
                userId: session.userId,
                productId: _id,
                name: name,
                // img: image,
                price: price,
                description: description,
                discount: discount,
                material: meterial
            };

            props.addToWishList(item);
        } else {
            confirmAlert({
                title: 'Login',
                message: 'Please login',
                buttons: [
                    {
                        label: 'Ok',

                    }
                ]
            })
        }
    };

    return (

        <div className='mr-0'>
            <div style={{display: "inline-block"}}>

            <Card style={{width: '16rem', display: "inline-block"}} className="mr-3 mt-5">

                <div >
                    <Link to={{pathname: '/ProductDetails', item:{_id, name, image, category,price, description,quantity,size,meterial,discount}}}>
                        <Card.Img variant='top' src={props.products.image}
                                  style={{width: "16rem", height: "20rem"}}/>
                    </Link>
                </div>


                <Card.Body>
                    <Card.Title style={{fontSize: "20px", fontFamily: "Open-Sans"}}>{props.products.name}</Card.Title>
                    {props.products.discount == 0 ?
                        <Card.Text>
                            <br/>
                            <span><b><center> Rs. {props.products.price}.00</center></b> </span>
                        </Card.Text>
                        :
                        <Card.Text>
                            <span style={{textDecoration: "line-through"}}><b><center> Rs. {props.products.price}.00</center></b> </span>
                            <span style={{color: "red"}}><b><center> Rs. {props.products.price - props.products.discount}.00</center></b> </span>
                        </Card.Text>
                    }

                    <button className="cart-btn ml-1" onClick={addToCartHandler}>
                        <i className="fas fa-cart-plus"/>
                    </button>
                    <button style={{position: "absolute", right: 20}} onClick={addToWishListHandler}>
                        <i className="fa fa-heart" aria-hidden="true" style={{color: "Red"}}></i>
                    </button>
                </Card.Body>
            </Card>
        </div>

        </div>
    );
};

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
    .wishlist-btn{
      position: absolute;
      bottom: 0;
      left: 0;
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
`;

export default connect(
    mapStateToProps
)(Product);