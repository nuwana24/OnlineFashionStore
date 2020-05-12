import React, {Component} from "react";

import {Switch, Route} from 'react-router-dom';

import NavBar from "./NavBar";
import NavBar2 from "./Navbar2";
import ProductList from "./ProductList";
import Product from "./Product";
import ProductDetails from "./ProductDetails";
import Cart  from "./Cart/Cart";
import Modal from "./Modal";
import store from './LoginHandler/store';
import { isAuth } from './LoginHandler/actions/authActions'
import PropTypes from "prop-types";
import DisplayProjects from "./DisplayProducts";
import {Carousel} from "react-bootstrap";
import Caro1 from "../Images/caro1.jpeg";
import Caro2 from "../Images/caro2.jpg";
import Caro3 from "../Images/caro3.jpg";

class UserHome extends Component{

    componentDidMount() {
        // Check if session cookie is present
        store.dispatch(isAuth());
    }

    static propTypes = {
        button: PropTypes.bool,
        isAuthenticated: PropTypes.bool,
    };

    render() {

        return (
         <div>
             {/*<NavBar/>*/}

             <Carousel>
                 <Carousel>
                     <Carousel.Item>
                         <img
                             className="d-block w-100"
                             style={{height:"40rem"}}
                             src={Caro1}
                             alt="First slide"
                         />
                     </Carousel.Item>
                     <Carousel.Item>
                         <img
                             className="d-block w-100"
                             style={{height:"40rem"}}
                             src={Caro2}
                             alt="Third slide"
                         />

                     </Carousel.Item>
                     <Carousel.Item>
                         <img
                             className="d-block w-100"
                             style={{height:"40rem"}}
                             src={Caro3}
                             alt="Third slide"
                         />

                     </Carousel.Item>
                 </Carousel>
             </Carousel>

                <DisplayProjects />
         </div>

        );
    }
}

export default UserHome;