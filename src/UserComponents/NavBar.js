import React, {Component} from 'react';

import {Link} from 'react-router-dom';
import logo2 from '../logo2.svg';
import styled from 'styled-components';
import {CartButtonContainer} from './Buttons';

class NavBar extends Component {
    render() {

        return (
            <NavWrapper className="navbar navbar-expand-sm navbar-darkv px-sm-5">
                <Link to="/">
                    <img src={logo2} alt="store" className="navbar-brand "/>
                </Link>

                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5">
                        <Link to="/" className="nav-link ">
                            products
                        </Link>
                    </li>
                </ul>
                <div className="">
                    <Link to='/WishListMain' className="ml-1">
                        <CartButtonContainer>
                         <span className="mr-2">
                             <i className=" fas fa-heart"></i>
                         </span>
                            WishList
                        </CartButtonContainer>
                    </Link>
                    <Link to='/login' className="ml-auto">
                        <CartButtonContainer>
                             <span className="mr-2">
                                <i className="fas fa-cart-plus"/>
                            </span>
                            Login
                        </CartButtonContainer>
                    </Link>
                    <Link to='/Cart' className="ml-auto">
                        <CartButtonContainer>
                         <span className="mr-2">
                            <i className="fas fa-cart-plus"/>
                         </span>
                            Cart
                        </CartButtonContainer>
                    </Link>
                </div>
            </NavWrapper>
        );
    }
}

const NavWrapper = styled.nav`
    background: var(--mainBlue);
    .nav-link {
      color: var(--mainWhite) !important;
      font-size: 1.3rem;
      text-transform: capitalize;
    }
`

export default NavBar;