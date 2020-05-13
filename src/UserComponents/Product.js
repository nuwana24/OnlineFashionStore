import React from 'react';

import styled from 'styled-components';
import {Button, Container, Card, CardDeck} from "react-bootstrap";
import {ProductConsumer} from "../context";
import {connect} from "react-redux";

const mapStateToProps = ({ session}) => ({
    session
});

const Product = ({session, ...props}) =>  {

    const {_id, name,img, price, description, meterial, discount } = props.products;

    const details = {
        userId: session.userId,
        id: _id,
        name : name,
        img : img,
        price : price,
        description : description,
        material : meterial
    };

    const addToCartHandler = () => {

        if(session.userId !== null){
            const item = {
                userId: session.userId,
                productId: _id,
                name: name,
                img: img,
                price: price,
                qty: 1,
                discount: discount
            };

            props.addToCart(item)
        }

    };

    const addToWishListHandler = () =>{
        const item = {
            userId: session.userId,
            productId: _id,
            name: name,
            price: price,
            qty: 1
        };

        props.addToWishList(item);
    }

    return (

        <div style={{display: "inline-block"}}>

            <Card style={{width: '18rem', flex: 2, display: "inline-block"}} className="mr-5 mt-5">
                <ProductConsumer>
                    {value => (
                        <div onClick={() => value.handleDetail(details)}>
                            <Card.Img variant='top' src={(`/uploads/${props.products.img}`)}
                                      style={{width: "18rem", height: "20rem"}}/>
                        </div>
                    )}

                </ProductConsumer>

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

                    <button className="cart-btn" onClick={() => props.addToCart} onClick={addToCartHandler}>
                        <i className="fas fa-cart-plus"/>
                    </button>
                    <button style={{position: "absolute", right: 20}} onClick={addToWishListHandler}>
                        <i className="fa fa-heart" aria-hidden="true" style={{color: "Red"}}></i>
                    </button>
                </Card.Body>
            </Card>
        </div>
    );



        // return (
        //
        //     <ProductWrapper className = "col-9 mx-auto col-md-6 col-lg-3 my-3">
        //         <div className="card">
        //             <div className="img-container p-5 ">
        //                 {/*<Link to="/ProductDetails" state={details}>*/}
        //                 <Link to={{pathname: 'ProductDetails', item:{name, img, price, description, meterial}}}>
        //                     <img src={(`/uploads/${img}`)} alt = "product" className="card-img-top"/>
        //                 </Link>
        //                 <button className="cart-btn"  onClick={addToCartHandler}>
        //                     <i className="fas fa-cart-plus"/>
        //                 </button>
        //             </div>
        //
        //             <div className="card-footer d-flex justify-content-between">
        //                 <p className="align-self-center mb-0">
        //                     {name }
        //                 </p>
        //
        //                 <h5 className="text-blue font-italic mb-0">
        //                     <span className="mr-1">$</span>
        //                     {price }
        //                 </h5>
        //             </div>
        //         </div>
        //     </ProductWrapper>
        //
        // );
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
`

export default connect(
    mapStateToProps
)(Product);


// render() {
//
//     const {id, title,img, price, inCart } = this.props.products;
//     return (
//
//         <ProductWrapper className = "col-9 mx-auto col-md-6 col-lg-3 my-3">
//             <div className="card">
//                 <ProductConsumer>
//                     {value => (
//                         <div className="img-container p-5 " onClick={() => value.handleDetail(id )}>
//                             <Link to="/ProductDetails">
//                                 <img src={img} alt = "product" className="card-img-top"/>
//                             </Link>
//
//
//                             <button className="cart-btn" disabled={inCart ? true:false} onClick={() =>  {value.addToCart(id); value.openModal(id);}}>
//                                 {inCart? (<p className="text-capitalize mb-0" disabled >In Cart</p>): (<i className="fas fa-cart-plus"/>)}
//                             </button>
//
//                         </div>
//                     )}
//                 </ProductConsumer>
//
//                 <div className="card-footer d-flex justify-content-between">
//                     <p className="align-self-center mb-0">
//                         {title }
//                     </p>
//
//                     <h5 className="text-blue font-italic mb-0">
//                         <span className="mr-1">$</span>
//                         {price }
//                     </h5>
//                 </div>
//             </div>
//         </ProductWrapper>
//
//     );
// }