
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
                    {/*<NavDropdown title="Manage Users" id="userManagerDD">*/}
                    {/*    /!*<NavDropdown.Item href= 'LoginForManagers'>Create Login for Store  Manager</NavDropdown.Item>*!/*/}
                    {/*    <Link to="/CreateLogin" className = "nav-item">Create Login for Store Manager</Link>*/}
                    {/*    <NavDropdown.Divider />*/}
                    {/*    /!*<NavDropdown.Item href="#action/3.2">Edit Store Managers</NavDropdown.Item>*!/*/}
                    {/*    <Link to="/EditManager" className = "nav-item">Edit Store Managers</Link>*/}
                    {/*    <NavDropdown.Divider />*/}
                    {/*    /!*<NavDropdown.Item href="#action/3.3">View Store Managers</NavDropdown.Item>*!/*/}
                    {/*    <Link to="/ViewManager" className = "nav-item">View Store Managers</Link>*/}
                    {/*</NavDropdown>*/}
                </Nav>
                <Nav>
                    <Nav.Link href="##">Logout</Nav.Link>
                    {/*<Navbar.Text>Hello Admin</Navbar.Text>*/}
                </Nav>

            </Navbar>



        );
    }
}