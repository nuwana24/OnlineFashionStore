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

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount() {
        var allItems =[];
        Axios.get('/additem/')
            .then(response => {

                var items = response.data;

                for(var x = 0; x < items.length ; x++){
                    var base64Flag = 'data:image/jpeg;base64,';
                    var imageStr = this.arrayBufferToBase64(items[x].img.data.data);
                    const item = {
                        _id : items[x]._id,
                        image: base64Flag+imageStr,
                        name: items[x].name,
                        category:items[x].category,
                        description:items[x].description,
                        price: items[x].price,
                        quantity:items[x].quantity,
                        size:items[x].size,
                        meterial:items[x].meterial,
                        comment:items[x].comment,
                        rating:items[x].name,
                        discount:items[x].discount,
                    }


                    allItems.push(item)

                }




                this.setState({
                    products: allItems
                })
            })

            .catch((error) => {
                console.log(error);
            })

        // Axios.get('/api/products/getProducts')
        //     .then(res => {
        //         const products = res.data;
        //
        //         var base64Flag = 'data:image/jpeg;base64,';
        //         var imageStr = this.arrayBufferToBase64(res.data.image.data.data);
        //         // this.setState({
        //         //     products: res.data,
        //         //     image:base64Flag+imageStr,
        //         //
        //         // })
        //
        //         let tempProducts = [];
        //         products.data.forEach(item => {
        //             const singleItem = {...item};
        //             tempProducts = [...tempProducts, singleItem];
        //         });
        //
        //         this.setState(() => {
        //             return {products: tempProducts, image:base64Flag+imageStr };
        //         });
        //
        //     })
    }

    addToCart = (item) => {
        Axios.post('/api/cart/addToCart', item);

        console.log('sent')
    };

    addToWishList = (item) => {
        Axios.post('/api/wishlist/addToWishList', item);

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
                    {/*<div className = "container">*/}
                        <Titles title={this.state.currentCat}/>
                        <div className='row  mr-5' style={{marginLeft:'5%'}}>
                            <div className='col-12'>
                                <div className='card-deck'>

                            {products.map( product =>{
                                // return <Product key={product.id} products={product} addToCart ={this.addToCart}/>;

                                if (product.category == this.state.currentCat) {
                                    return <Product key={product.id} products={product} addToCart ={this.addToCart} addToWishList = {this.addToWishList} />;

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
                        </div>

                    {/*</div>*/}
                    </center>
                </div>

            </React.Fragment>
        );
    }
}

export default ProductList;

