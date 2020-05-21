// import React, {Component} from 'react';
//
// import {storeProducts, detailProduct } from "./data";
//
// import Axios from "axios";
// const ProductContext = React.createContext();
//
//
//
//
// class ProductProvider extends Component {
//
//     state= {
//         products: [],
//         detailProduct: detailProduct,
//         cart: [],
//         modalOpen: false,
//         modalProduct: detailProduct,
//         cartSubTotal: 0,
//         categorys: [],
//         cartTax: 0,
//         cartTotal: 0,
//         //WishList
//         WishListItems: [],
//         favouritesProduct: favouritesProduct,
//         WishList: [],
//         details:''
//     };
//
//     componentDidMount() {
//         this.setProducts();
//         this.setFavourites();
//
//     }
//
//     setProducts = () => {
//       let tempProducts = [];
//       storeProducts.forEach(item => {
//           const singleItem = {...item};
//           tempProducts = [...tempProducts, singleItem];
//       });
//
//       this.setState(() => {
//          return {products: tempProducts};
//       });
//     };
//
//     getItem = (id) => {
//         const product = this.state.products.find(item => item.id === id );
//         return product;
//     };
//
//     handleDetail = (details) =>{
//
//         this.setState(() => {
//             return {details: details}
//         })
//     };
//
//     // handleDetail = (id) =>{
//     //     const product = this.getItem(id);
//     //     this.setState(() => {
//     //         return {detailProduct: product}
//     //     })
//     // };
//
//     addToCart = id =>{
//         let tempProducts = [...this.state.products];
//         const index = tempProducts.indexOf(this.getItem(id));
//         const product = tempProducts[index];
//         product.inCart = true;
//         product.count = 1;
//         const price = product.price
//         product.total = price;
//
//         this.setState(() => {
//            return {products: tempProducts, cart: [...this.state.cart,product]}
//         },() => {this.addTotals() });
//     };
//
//     openModal = id => {
//         const product = this.getItem(id);
//         this.setState(() => {
//            return {modalProduct: product, modalOpen: true}
//         });
//     };
//
//     closeModal = () => {
//         this.setState(() => {
//            return {modalOpen: false}
//         });
//     };
//
//     increment = (id) => {
//         let tempCart = [...this.state.cart];
//         const selectedProduct = tempCart.find(item =>  item.id === id);
//         const index = tempCart.indexOf(selectedProduct);
//         const product = tempCart[index];
//
//         product.count = product.count + 1;
//         product.total = product.price * product.count;
//
//         this.setState(() => {
//             return{
//                 cart: [...tempCart]
//             }
//         },() => {
//             this.addTotals();
//         });
//     };
//
//     decrement = (id) => {
//         let tempCart = [...this.state.cart];
//         const selectedProduct = tempCart.find(item=>item.id === id);
//
//         const index = tempCart.indexOf(selectedProduct);
//         const product = tempCart[index];
//         product.count = product.count -1;
//
//         if(product.count === 0){
//             this.removeItem(id);
//         }else {
//             product.total = product.count * product.price;
//             this.setState(
//                 ()=>{
//                     return {cart: [...tempCart]};
//                 },
//                 ()=>{
//                     this.addTotals();
//                 }
//             )
//         }
//     }
//
//     removeItem = (id) => {
//         let tempProducts = [...this.state.products];
//         let tempCart = [...this.state.cart];
//
//         tempCart = tempCart.filter(item => item.id !== id);
//         const index = tempProducts.indexOf(this.getItem(id));
//         let removedProduct = tempProducts[index];
//
//         removedProduct.inCart = false;
//         removedProduct.count = 0;
//         removedProduct.total = 0;
//
//         this.setState(() => {
//             return{
//                 cart: [...tempCart],
//                 products: [...tempProducts]
//             }
//         },() => {
//             this.addTotals();
//         });
//     };
//
//     clearCart = () => {
//         this.setState(() => {
//             return{ cart: []}
//         }, () => {
//             this.setProducts();
//             this.addTotals();
//         });
//     };
//
//     addTotals = () => {
//         let subTotal = 0;
//         this.state.cart.map(item => {
//             subTotal += item.total;
//         });
//         const tempTax = subTotal * 0.1;
//         const tax = parseFloat(tempTax.toFixed(2));
//         const total = subTotal + tax;
//
//         this.setState(() => {
//             return {
//                 cartSubTotal: subTotal,
//                 cartTax: tax,
//                 cartTotal: total
//             }
//         });
//     };
//
//     //WishList Context
//
//     //set favourites for wishList
//     setFavourites = () =>{
//         let tempItem = [];
//         storeFavourites.forEach(item => {
//             const FavsOne = {...item};
//             tempItem = [...tempItem, FavsOne];
//         });
//
//         this.setState(() => {
//             return {WishListItems: tempItem};
//         });
//     }
//
//     //get favourites
//     getFavourites = (id) =>{
//         const favourite = this.state.WishListItems.find(item => item.id === id );
//         return favourite;
//     }
//
//     //handle favourites
//     handleFavourites = (id) =>{
//         const favourite = this.getFavourites(id);
//         this.setState(() => {
//             return {favouritesProduct: favourite}
//         })
//     };
//
//     //Add to wishList
//     addToWishList = id =>{
//         let tempItem = [...this.state.WishListItems];
//         const index = tempItem.indexOf(this.getFavourites(id));
//         const favourite = tempItem[index];
//         favourite.inWishList = true;
//
//         this.setState(() => {
//             return {WishListItems: tempItem, WishList: [...this.state.WishList,favourite]}
//         });
//
//     };
//     //Remove Favourites
//     removeFavourites = (id) => {
//         let tempItem = [...this.state.WishListItems];
//         let tempCart = [...this.state.WishList];
//
//         tempCart = tempCart.filter(item => item.id !== id);
//         const index = tempItem.indexOf(this.getFavourites(id));
//         let removedFavourites = tempItem[index];
//
//         removedFavourites.inWishList = false;
//
//         this.setState(() => {
//             return{
//                 WishList: [...tempCart],
//                 WishListItems: [...tempItem]
//             }
//         });
//     };
//
//     //Handle
//     // HandleWishList = (id) =>{
//     //
//     //     const favourite = this.getFavourites(id);
//     //     console.log(favourite);
//     //
//     //     if(! favourite.inWishList){
//     //         console.log('IN IF()');
//     //         this.addToWishList(id);
//     //     }
//     //     else {
//     //         console.log('IN ELSE()');
//     //         this.removeFavourites(id);
//     //     }
//     // };
//
//     // changned = () =>{
//     //     alert("Added to WishList")
//     // };
//
//     render() {
//         return (
//             <ProductContext.Provider value={{
//                 ...this.state,
//                 handleDetail: this.handleDetail,
//                 addToCart: this.addToCart,
//                 openModal: this.openModal,
//                 closeModal: this.closeModal,
//                 increment: this.increment,
//                 decrement: this.decrement,
//                 removeItem: this.removeItem,
//                 clearCart: this.clearCart,
//                 handleFavourites: this.handleFavourites,
//                 addToWishList: this.addToWishList,
//                 removeFavourites: this.removeFavourites,
//                 HandleWishList: this.HandleWishList,
//                 // changned: this.changned
//             }}>
//                 {this.props.children}
//             </ProductContext.Provider>
//         );
//     }
// }
//
// const ProductConsumer = ProductContext.Consumer;
//
// export {ProductProvider, ProductConsumer};
