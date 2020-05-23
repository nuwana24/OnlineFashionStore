
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Form} from 'react-bootstrap';
import { Link } from "react-router-dom";
import logo from "../Images/logo.jpg";
import narbarCss from "../UserComponents/UserCss/navbarCss.css";


export default class NavBar extends Component{
    render() {


        return(

            <Navbar bg="light" expand="lg">
                <Navbar.Brand >
                    <Link >
                        <img src={logo} className="menu__logo navbar-brand"></img>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link>
                            <Link className=" nav-link "  to="/Manager">
                                <i className="fas fa-home "></i> &nbsp;
                                Home
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className="nav-link" to="/addItem">
                                <i className="fas fa-plus-circle"></i> &nbsp;
                                Add Item
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className="nav-link" to="/addDiscount">
                                <i className="fa fa-cart-plus"></i> &nbsp;
                                Add Discount
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className="nav-link" to="/itemList">
                                <i className="fa fa-pencil-square-o"></i> &nbsp;
                                Item List
                            </Link>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link><Link className=" nav-link mr-sm-2" to="/AdLog" >
                            <i className="fas fa-user-circle"></i> &nbsp;
                            Logout
                        </Link>
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            // <nav className='menu'>
            //  <a href='/'>
            //     <img src={logo} className="menu__logo"></img>
            // </a>
            //     {/*<div className="menu__right">*/}
            //     {/*    <ul className="menu__list">*/}
            //         <li className="menu__list-item">
            //             <a className="menu__link2" href="/Manager">
            //             <i className="fas fa-home"></i> &nbsp;
            //             Home
            //         </a>
            //         </li>
            //         <li className="menu__list-item">
            //             <a className="menu__link2" href="/addItem">
            //                Add Item
            //             </a>
            //         </li>
            //         <li className="menu__list-item">
            //             <a className="menu__link2" href="/itemList">
            //                 Item List
            //             </a>
            //         </li>
            //         <li className="menu__list-item">
            //             <a className="menu__link2" href="/addDiscount">
            //                 Add Discount
            //             </a>
            //         </li>
            //
            //
            //
            //     <li className="menu__list-item"><a className="menu__link2" href="/AdLog" style={{position:"absolute",right:20}}>
            //         <i className="fas fa-user-circle"></i> &nbsp;
            //         Logout
            //     </a></li>
            //
            //     {/*    </ul>*/}
            //     {/*</div>*/}
            //
            // </nav>





        );
    }
}
