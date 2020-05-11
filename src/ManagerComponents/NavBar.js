
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Form} from 'react-bootstrap';
import { Link } from "react-router-dom";


export default class NavBar extends Component{
    render() {


        return(

            <Navbar bg ="dark" variant="dark">
                <Navbar.Brand>
                    ShoppyStore
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to="/Manager" className = "nav-link">Home</Link>
                    <Link to="/addItem" className = "nav-link">Add Item</Link>
                    <Link to="/itemList" className = "nav-link">Item List</Link>
                    <Link to="/addDiscount" className = "nav-link">Add Discount</Link>



                </Nav>
                <Nav>
                    <Nav.Link href="##">Logout</Nav.Link>
                </Nav>

            </Navbar>



        );
    }
}
