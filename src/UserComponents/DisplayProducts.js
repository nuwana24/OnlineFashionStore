import React,{Component} from "react";
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router'
import NavBar from "./NavBar";

import {Button, Container, Card, CardDeck} from "react-bootstrap";
import axios from 'axios';
import {connect} from "react-redux";
import NavBar2 from "./Navbar2";
import {ProductConsumer} from "../context";
// import {Card} from "material-ui";
import {products} from "./DisplayProducts.js";
import Item from "./Item";


// const mapStateToProps = ({ session}) => ({
//     session
// });
//
// const Item = ({session, ...props}) => {
//     const {_id, name,img, price, description, meterial } = props.products;
//
//     const details = {
//         userId: session.userId,
//         id: _id,
//         name : name,
//         img : img,
//         price : price,
//         description : description,
//         material : meterial
//     };
//
//     console.log('Details ' + details);
//
//     const addToCartHandler = () => {
//
//         const item = {
//             userId: session.userId,
//             productId: _id,
//             name: name,
//             price: price,
//             qty: 1
//         };
//
//         props.addToCart(item)
//     };
//
//     return (
//         <div style={{display:"inline-block"}}>
//
//             <Card style={{width: '18rem', flex: 2, display: "inline-block"}} className="mr-5 mt-5">
//                 <ProductConsumer>
//                     {value =>(
//                         <div  onClick={() => value.handleDetail(details)}>
//                         <Card.Img variant='top' src={(`/uploads/${props.products.img}`)}
//                                   style={{width: "18rem", height: "20rem"}}/>
//                         </div>
//                     )}
//
//                 </ProductConsumer>
//
//                 <Card.Body>
//                     <Card.Title style={{fontSize: "20px", fontFamily: "Open-Sans"}}>{props.products.name}</Card.Title>
//                     {props.products.discount == 0 ?
//                         <Card.Text>
//                             <br/>
//                             <span><b><center> Rs. {props.products.price}.00</center></b> </span>
//                         </Card.Text>
//                         :
//                         <Card.Text>
//                             <span style={{textDecoration: "line-through"}}><b><center> Rs. {props.products.price}.00</center></b> </span>
//                             <span style={{color: "red"}}><b><center> Rs. {props.products.price - props.products.discount}.00</center></b> </span>
//                         </Card.Text>
//                     }
//
//                     <button className="cart-btn" onClick={() => props.addToCart}>
//                         <i className="fas fa-cart-plus"/>
//                     </button>
//                     <button style={{position: "absolute", right: 20}} onClick={addToCartHandler}>
//                         <i className="fa fa-heart" aria-hidden="true" style={{color: "Red"}}></i>
//                     </button>
//                 </Card.Body>
//             </Card>
//         </div>
//     );
//
//
// };


class DisplayProducts extends Component {
    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);
        this.GetCategory = this.GetCategory.bind(this);


        this.state = {
            currentCat:'All Items',
            // itemlist: []

        }

    }

    state = {
        itemlist: []
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/products/getProducts')
            .then(res => {
                const products = res.data.data;

                let tempProducts = [];
                products.forEach(item => {
                    const singleItem = {...item};
                    tempProducts = [...tempProducts, singleItem];
                });

                this.setState(() => {
                    return {itemlist: tempProducts};
                });

            })
    }

    addToCart = (item) => {
        axios.post('http://localhost:8000/api/cart/addToCart', item);

        console.log('sent')
    };


    // itemList(){
    //
    //     const {itemlist} = this.state;
    //     return itemlist.map(currentitem =>{
    //         if(currentitem.category == this.state.currentCat){
    //             return <Item products={currentitem} key = {currentitem._id} addToCart ={this.addToCart} />;
    //         }
    //         else if(this.state.currentCat == 'All Items')
    //         {
    //             return <Item products={currentitem} key = {currentitem._id} addToCart ={this.addToCart}/>;
    //         }
    //         else if(this.state.currentCat == 'Discounted'){
    //             if(currentitem.discount > 0){
    //                 return <Item products={currentitem} key = {currentitem._id} addToCart ={this.addToCart}/>;
    //             }
    //         }
    //
    //         // return <Item item={currentitem} key = {currentitem._id} addToCart ={this.addToCart}/>;
    //     })


    // }

    GetCategory(category){
       this.setState({
           currentCat : category
       })
    }

    render() {
        const {itemlist} = this.state;
        return (

            <div>
                {/*<NavBar />*/}
                <NavBar2 onClickChanger={this.GetCategory}/>
                <Container>
                    <center><h2>{this.state.currentCat}</h2></center>
                    <div style={{flexDirection: 'row'}} >
                        {itemlist.map(currentitem => {
                            if (currentitem.category == this.state.currentCat) {
                                return <Item products={currentitem} key={currentitem._id} addToCart={this.addToCart}/>;
                            } else if (this.state.currentCat == 'All Items') {
                                return <Item products={currentitem} key={currentitem._id} addToCart={this.addToCart}/>;
                            } else if (this.state.currentCat == 'Discounted') {
                                if (currentitem.discount > 0) {
                                    return <Item products={currentitem} key={currentitem._id}
                                                 addToCart={this.addToCart}/>;
                                }
                            }

                            // return <Item item={currentitem} key = {currentitem._id} addToCart ={this.addToCart}/>;
                        })
                        }
                    </div>




                </Container>
            </div>

        );
    }
}
export default DisplayProducts;
