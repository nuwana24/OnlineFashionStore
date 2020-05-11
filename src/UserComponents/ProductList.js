import React, {useEffect, Component}from "react";
import Axios from "axios";

import Product from "./Product";
import Titles from "./Titles";
import NavBar from "./NavBar";

class ProductList extends Component {

    constructor() {
        super();
        this.addToCart = this.addToCart.bind(this)
    }

    state = {
        products: []
    };

    componentDidMount() {
        Axios.get('http://localhost:5000/api/products/getProducts')
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
        Axios.post('http://localhost:5000/api/cart/addToCart', item);

        console.log('sent')
    };


    render() {
        const {products} = this.state;
        console.log(products)
        return (
            <React.Fragment>
                <NavBar />
                <div className = "py-5 ">
                    <div className = "container">
                        <Titles name = "Fashion " title = "Hub"/>
                        <div className="row">
                            {products.map( product =>{
                                return <Product key={product.id} products={product} addToCart ={this.addToCart}/>;
                            })}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ProductList;


// render() {
//
//     console.log(this.state.products.data);
//
//     return (
//         <React.Fragment>
//             <NavBar />
//             <div className = "py-5 ">
//                 <div className = "container">
//                     <Titles name = "Fashion " title = "Hub"/>
//                     <div className="row">
//                         <ProductConsumer>
//                             {list => {
//                                 return list.products.map( product =>{
//                                     return <Product key={product.id} products={product} />;
//                                 })
//                             }}
//                         </ProductConsumer>
//                     </div>
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// }