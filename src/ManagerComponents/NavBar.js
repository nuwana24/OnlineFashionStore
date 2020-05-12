
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Form} from 'react-bootstrap';
import { Link } from "react-router-dom";
import logo from "../Images/logo.jpg";
import narbarCss from "../UserComponents/UserCss/navbarCss.css";


export default class NavBar extends Component{
    render() {


        return(
            <nav className='menu'>
             <a href='/'>
                <img src={logo} className="menu__logo"></img>
            </a>
                {/*<div className="menu__right">*/}
                {/*    <ul className="menu__list">*/}
                    <li className="menu__list-item">
                        <a className="menu__link2" href="/Manager">
                        <i className="fas fa-home"></i> &nbsp;
                        Home
                    </a>
                    </li>
                    <li className="menu__list-item">
                        <a className="menu__link2" href="/addItem">
                           Add Item
                        </a>
                    </li>
                    <li className="menu__list-item">
                        <a className="menu__link2" href="/itemList">
                            Item List
                        </a>
                    </li>
                    <li className="menu__list-item">
                        <a className="menu__link2" href="/addDiscount">
                            Add Discount
                        </a>
                    </li>



                <li className="menu__list-item"><a className="menu__link2" href="/AdLog" style={{position:"absolute",right:20}}>
                    <i className="fas fa-user-circle"></i> &nbsp;
                    Logout
                </a></li>

                {/*    </ul>*/}
                {/*</div>*/}

            </nav>



        );
    }
}
