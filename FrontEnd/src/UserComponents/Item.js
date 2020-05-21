import React from 'react';

import styled from 'styled-components';
import {Link} from "react-router-dom";
import {ProductConsumer} from "../context";
import {connect} from "react-redux";
import {Button, Container, Card, CardDeck} from "react-bootstrap";

const mapStateToProps = ({ session}) => ({
    session
});

const Item = ({session, ...props}) => {

    const {_id, name, img, price, description, meterial} = props.products;

    const details = {
        userId: session.userId,
        id: _id,
        name: name,
        img: img,
        price: price,
        description: description,
        material: meterial
    };

    console.log('Details ' + details);

    const addToCartHandler = () => {

        const item = {
            userId: session.userId,
            productId: _id,
            name: name,
            price: price,
            qty: 1
        };

        props.addToCart(item)
    };
    return (
        <div style={{display: "inline-block"}}>

            <Card style={{width: '18rem', flex: 2, display: "inline-block"}} className="mr-5 mt-5">
                {/*<ProductConsumer>*/}
                {/*    {value => (*/}
                        <div onClick={() => value.handleDetail(details)}>
                            <Card.Img variant='top' src={(`/uploads/${props.products.img}`)}
                                      style={{width: "18rem", height: "20rem"}}/>
                        </div>
                {/*    )}*/}

                {/*</ProductConsumer>*/}

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

                    <button className="cart-btn" onClick={() => props.addToCart}>
                        <i className="fas fa-cart-plus"/>
                    </button>
                    <button style={{position: "absolute", right: 20}} onClick={addToCartHandler}>
                        <i className="fa fa-heart" aria-hidden="true" style={{color: "Red"}}></i>
                    </button>
                </Card.Body>
            </Card>
        </div>
    );
}
export default connect(
    mapStateToProps
)(Item);