
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
                    <Link to="/Admin" className = "nav-link">Home</Link>
                    {/*<Link to="/AddCategory" className = "nav-link">Add Categories</Link>*/}
                    <NavDropdown title="Manage Categories" id="categoryManager" className="bg-dark">
                        <Link to="/AddCategory" className = "nav-item text-bright">Add New Category</Link>
                        <NavDropdown.Divider />
                        <Link to="/ViewCategories" className = "nav-item text-bright">View Categories</Link>
                    </NavDropdown>
                    <NavDropdown title="Manage Users" id="userManagerDD" className="bg-dark">
                        <Link to="/CreateLogin" className = "nav-item text-bright">Create Login for Store Manager</Link>
                        <NavDropdown.Divider />
                        <Link to="/ViewManager" className = "nav-item text-bright">View Store Managers</Link>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="##">Logout</Nav.Link>
                    <Navbar.Text>Hello Admin</Navbar.Text>
                </Nav>

              </Navbar>



        );
    }
}