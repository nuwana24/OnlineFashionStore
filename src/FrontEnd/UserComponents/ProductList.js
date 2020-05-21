import React, { Component}from "react";
import Axios from "axios";

import Product from "./Product";
import Titles from "./Titles";
import NavBar from "./NavBar";


class ProductList extends Component {

    constructor() {
        super();
        this.addToCart = this.addToCart.bind(this);
        this.addToWishList = this.addToWishList.bind(this);
        this.GetCategory = this.GetCategory.bind(this);

    }

    state = {
        products: [],
        currentCat:'All Items'
    };

    componentDidMount() {
        Axios.get('http://localhost:8000/api/products/getProducts')
            .then(res => {
                const products = res.data;

                let tempProducts = [];
                products.data.forEach(item => {
                    const singleItem = {...item};
                    tempProducts = [...tempProducts, singleItem];
                });

                this.setState(() => {
                    return {products: tempProducts};
                });

            })
    }

    addToCart = (item) => {
        Axios.post('http://localhost:8000/api/cart/addToCart', item);

        console.log('sent')
    };

    addToWishList = (item) => {
        Axios.post('http://localhost:8000/api/wishlist/addToWishList', item);

        console.log('sent')
    };

    GetCategory(category){
        this.setState({
            currentCat : category
        })
    }
    render() {
        const {products} = this.state;

        return (
            <React.Fragment>
                <NavBar onClickChanger={this.GetCategory}/>

                <div className = "py-5 ">
                    <center>
                    <div className = "container">
                        <Titles title={this.state.currentCat}/>
                        <div className="row ">
                            {products.map( product =>{
                                // return <Product key={product.id} products={product} addToCart ={this.addToCart}/>;

                                if (product.category == this.state.currentCat) {
                                    return <Product key={product.id} products={product} addToCart ={this.addToCart} addToWishList = {this.addToWishList}/>;

                                } else if (this.state.currentCat == 'All Items') {
                                    return<Product key={product.id} products={product} addToCart ={this.addToCart} addToWishList = {this.addToWishList}/>;

                                } else if (this.state.currentCat == 'Discounted') {
                                    if (product.discount > 0) {
                                        return <Product key={product.id} products={product} addToCart ={this.addToCart} addToWishList = {this.addToWishList}/>;
                                    }
                                }
                            })}
                        </div>
                    </div>
                    </center>
                </div>

            </React.Fragment>
        );
    }
}

export default ProductList;

