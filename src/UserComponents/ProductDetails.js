import React, {Component} from 'react';
import {ProductConsumer } from "../context";
import {Link } from "react-router-dom";
import {CartButtonContainer} from "./Buttons";
import {ReviewButtonContainer} from "./Buttons";
import StarRatingComponent from './StarRatingComponent';
import NavBar from "./NavBar";

import {TextField} from "@material-ui/core";

class ProductDetails extends Component {

    constructor() {
        super();
        this.state = {
            value: 'Please write review about this product.'
        };

        this.state = {
            rating: 1
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
            alert('An Review was submitted');
            event.preventDefault();
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    render() {
        const { rating } = this.state;

        return (
            <ProductConsumer>
                {value => {
                    const {id, company, img, info, price, title, inCart} = value.detailProduct;
                    const {inWishList} = value.favouritesProduct;

                    return (
                        <div>
                        <NavBar />
                        <div className="container py-5">

                            <div className="row">
                                 <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                     <h1>{title}</h1>
                                 </div>
                            </div>

                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3">
                                    <img src ={img} className="img-fluid" alt="product"/>
                                    <ReviewButtonContainer
                                        WishList
                                        onClick={() => {
                                            value.HandleWishList(id);
                                            value.addToWishList(id);
                                            value.changned();
                                        }}>
                                        <span className="mr-1">
                                            <i className=" fas fa-heart" ></i>
                                        </span>
                                    </ReviewButtonContainer>
                                </div>

                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2>Model : {title}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                        Made By : <span className="text-uppercase "> {company} </span>
                                    </h4>
                                    <h4 className="text-blue">
                                        <strong>
                                            Price : <span>$</span> {price}
                                        </strong>
                                    </h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                        About Product
                                    </p>
                                    <p className="text-muted lead">
                                        {info}
                                    </p>
                                    <div>
                                        <h5>Ratings: {rating}</h5>
                                        <StarRatingComponent
                                            name="rate1"
                                            starCount={5}
                                            value={rating}
                                            onStarClick={this.onStarClick.bind(this)}
                                        />
                                        <form onSubmit={this.handleSubmit}>
                                            <label>
                                                <h5>Summary of Review</h5>
                                                <textarea value={this.state.value} onChange={this.handleChange} />
                                            </label>
                                            <div>
                                                <ReviewButtonContainer type="submit">Submit Review</ReviewButtonContainer>
                                            </div>
                                        </form>
                                    </div>
                                    <div>
                                        <Link to='/'>
                                            <CartButtonContainer> Back to Home</CartButtonContainer>
                                        </Link>
                                        <CartButtonContainer
                                            Cart
                                            disabled = {inCart? true: false}
                                            onClick={() => {
                                                value.addToCart(id);
                                                value.openModal(id);
                                        }}>
                                            {inCart? "In Cart": "Add to Cart"}
                                        </CartButtonContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    );
                }}

            </ProductConsumer>
        );
    }
}

export default ProductDetails;