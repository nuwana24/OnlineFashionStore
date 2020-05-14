
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Form} from 'react-bootstrap';
import { Link } from "react-router-dom";
import narbarCss from "../UserComponents/UserCss/navbarCss.css";
import logo from "../Images/logo.jpg";


export default class NavBar extends Component{
    render() {


        return(
            <nav className='menu'>
                <Link to='/'>
                    <img src={logo} className="menu__logo"></img>
                </Link>
                <div className="menu__right">
                    <ul className="menu__list">

                    </ul>
                </div>
            </nav>





        );
    }
}