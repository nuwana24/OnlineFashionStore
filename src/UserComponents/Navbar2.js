import React, {Component} from 'react';
import navbarCSS from "./UserCss/navbarCss.css";
import {Link} from 'react-router-dom';
import logo2 from '../logo2.svg';
import styled from 'styled-components';
import {CartButtonContainer} from './Buttons';
import PropTypes from "prop-types";
import logo from "../../src/Images/logo.jpg";
import axios from "axios";

class NavBar2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/category')
            .then(response => {
                this.setState({
                    itemList: response.data
                })
            })

            .catch((error) => {
                console.log(error);
            })

    }


    render() {

        let links = this.state.itemList.map((link, index) => {
            return (
                <li className="menu__list-item"><a className="menu__link" href="#">{link.category}</a></li>

            )
        })


        return (
            <nav className='menu'>
                <img src={logo} className="menu__logo"></img>
            <div className="menu__right">
                <ul className="menu__list">
                    {links}
                    <li className="menu__list-item"><a className="menu__link" href="/Cart" style={{position:"absolute",right:250}}>
                        {/*<Link to='/Cart'>*/}
                        <i className="fas fa-cart-plus"></i> &nbsp;
                       Cart
                        {/*</Link>*/}
                    </a></li>
                    <li className="menu__list-item"><a className="menu__link" href="/WishListMain" style={{position:"absolute",right:120}}>
                        <i className="fas fa-cart-plus"></i> &nbsp;
                       Wishlist
                    </a></li>
                    <li className="menu__list-item"><a className="menu__link" href="/login" style={{position:"absolute",right:20}}>
                        <i className="fas fa-user-circle"></i> &nbsp;
                        Login
                    </a></li>
                </ul>

            </div>
            </nav>
        )
    }
}

NavBar2.propTypes = {
        onClickChanger : PropTypes.func,
}


export default NavBar2;