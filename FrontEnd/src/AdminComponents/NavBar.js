import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Form} from 'react-bootstrap';
import { Link } from "react-router-dom";
import narbarCss from "../UserComponents/UserCss/navbarCss.css";
import logo from "../Images/logo.jpg";
import {login} from "../UserComponents/actions/session";
import {logout} from "../UserComponents/actions/session";
import {connect} from "react-redux";


const mapStateToProps = ({session}) => ({
     session
});

const mapDispatchToProps = dispatch => ({
    logout :()  => dispatch(logout())
});


const NavBar  = ({session, logout}) =>{


        return(

            <Navbar bg="light" expand="lg">
                <Navbar.Brand >
                    <Link>
                        <img src={logo} className="menu__logo navbar-brand"></img>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link>
                            <Link className=" nav-link "  to="/Admin">
                                <i className="fas fa-home "></i> &nbsp;
                                Home
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <NavDropdown title={<span>
                        <i className="fas fa-user-edit"></i>&nbsp;
                                Manage Categories</span>} id="userManagerDD" >
                                <NavDropdown.Item ><Link to="/AddCategory" className=" nav-link " >Add New Category</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to="/ViewCategory" className=" nav-link " >View Categories</Link></NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Link>
                        <Nav.Link>
                            <NavDropdown title={<span>
                        <i className="fas fa-user-edit"></i>&nbsp;
                                Manage Store Managers</span>} id="userManagerDD" >
                                <NavDropdown.Item ><Link to="/CreateLogin" className=" nav-link " >Create Login for Store Manager</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to="/ViewManager" className=" nav-link " >View Store Managers</Link></NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className="nav-link" to="/ViewStats">
                                <i className="fas fa-chart-bar"></i> &nbsp;
                                View Insights
                            </Link>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link ><Link className=" nav-link mr-sm-2"  to='/AdLog'>
                            <i className="fas fa-user-circle"></i> &nbsp;
                            Logout
                        </Link>
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>






        );
    }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar);
