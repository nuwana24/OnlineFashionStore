import React, {Component} from 'react';

import Product from "./Product";
import Titles from "./Titles";
import {ProductConsumer} from "../context";
import NavBar from "./NavBar";

class ProductList extends Component {

    render() {
        return (
            <React.Fragment>
            <NavBar />
                <div className = "py-5 ">
                    <div className = "container">
                        <Titles name = "Fashion " title = "Hub"/>
                        <div className="row">
                            <ProductConsumer>
                                {list => {
                                    return list.products.map( product =>{
                                        return <Product key={product.id} products={product} />;
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ProductList;