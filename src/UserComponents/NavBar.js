
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Form} from 'react-bootstrap';
import { Link } from "react-router-dom";
import narbarCss from "../UserComponents/UserCss/navbarCss.css";
import logo from "../Images/logo.jpg";
import PropTypes from "prop-types";
import NavBar2 from "./Navbar2";
import axios from "axios";


class NavBar extends Component{
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
                // <li className="menu__list-item"><a className="menu__link"  onClick={() => this.props.onClickChanger(link.category)}>{link.category}</a></li>
                <Nav.Link> <Link className=" nav-link "  onClick={()=>this.props.onClickChanger(link.category)}>{link.category}</Link></Nav.Link>


            )
        })



        return(

            <Navbar bg="light" expand="lg">
                <Navbar.Brand >
                    <Link to='/'>
                        <img src={logo} className="menu__logo navbar-brand"></img>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {links}
                        <Nav.Link>
                            <Link className=" nav-link " onClick={() => this.props.onClickChanger("Discounted")}>Discounted items</Link>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link> <Link  className="nav-link" to="/WishListMain">
                            <i className="fas fa-cart-plus"></i> &nbsp;
                            Wishlist
                        </Link>
                        </Nav.Link>
                        <Nav.Link> <Link  className="nav-link" to='/Cart'>
                            <i className="fas fa-cart-plus"></i> &nbsp;
                            Cart
                        </Link>
                        </Nav.Link>
                        <Nav.Link> <Link  className="nav-link" to="/login">
                            <i className="fas fa-user-circle"></i> &nbsp;
                            Login
                        </Link>
                        </Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>






        );
    }
}
NavBar.propTypes = {
    onClickChanger : PropTypes.func,
}
export default NavBar;