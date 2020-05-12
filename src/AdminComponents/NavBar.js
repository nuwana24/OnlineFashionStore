
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
               <a href='/'>
                <img src={logo} className="menu__logo"></img>
               </a>
                <div className="menu__right">
                    <ul className="menu__list">
                        <li className="menu__list-item"><a className="menu__link2" href="/Admin">
                            {/*<Link to='/Cart'>*/}
                            <i className="fas fa-home"></i> &nbsp;
                            Home
                            {/*</Link>*/}
                        </a></li>
                        <li className="menu__list-item">
                            <NavDropdown className='menu__link2' title={<span style={{color:"#3a3e47"}} >
                                 <i className="fas fa-table"></i>&nbsp;
                                Manage Categories
                            </span>} id="categoryManager" >
                                        <a href="/AddCategory" className = "menu__link2">Add New Category</a>
                                         <NavDropdown.Divider />
                                        <a href="/ViewCategory" className = "menu__link2">View Categories</a>
                        </NavDropdown>
                        </li>
                        <li className="menu__list-item">

                            <NavDropdown className='menu__link2' title={<span style={{color:"#3a3e47"}} >
                            <i className="fas fa-user-edit"></i>&nbsp;
                                Manage Store Managers</span>} id="userManagerDD" >
                                           <a href="/CreateLogin" className = "menu__link2">Create Login for Store Manager</a>
                                            <NavDropdown.Divider />
                                            <a href="/ViewManager" className = "menu__link2">View Store Managers</a>
                            </NavDropdown>
                          </li>
                        <li className="menu__list-item"><a className="menu__link2" href="/ViewStats">

                            <i className="fas fa-chart-bar"></i> &nbsp;
                            View Insights

                        </a></li>
                        <li className="menu__list-item"><a className="menu__link2" href="/AdLog" style={{position:"absolute",right:20}}>
                            <i className="fas fa-user-circle"></i> &nbsp;
                            Logout
                        </a></li>

                    </ul>

                </div>
            </nav>





        );
    }
}