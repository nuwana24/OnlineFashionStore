import React, {Component} from 'react';

import Titles  from "../Titles";
import CartColumns from './CartColumns';
import EmptyCart  from "./EmptyCart";
import {ProductConsumer} from "../../context";

import CartList from "./CartList";
import CartTotals from "./CartTotals"
import NavBar from "../NavBar";
import axios from 'axios';
import PropTypes from "prop-types";
import store from '../LoginHandler/store';
import { isAuth } from '../LoginHandler/actions/authActions'
import {AUTH_FAIL, AUTH_SUCCESS} from "../LoginHandler/actions/types";
import { connect } from "react-redux";
import { buttonReset} from '../LoginHandler/actions/uiActions';

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users : ''
        };
    }

    // componentDidMount() {
    //     fetch('http://localhost:5000/users/validate')
    //         .then(response => response.text())
    //         .then(response => { console.log(response)
    //         });
    //
    //     console.log(this.state.validity);
    //
    //     if(this.state.validity === ''){
    //         console.log('Null')
    //     } else {
    //         console.log('Validity'+this.state.validity)
    //     }
    //
    // }
    // componentDidMount() {
    //     axios.get('http://localhost:5000/users/authenticator', {withCredentials:true})
    //         .then(res => {
    //             console.log(res);
    //             return res.json()
    //         })
    //         .then(users => {
    //             console.log(users);
    //             this.setState({users})
    //         })
    //}
    componentDidMount() {
        //Check if session cookie is present
        store.dispatch(isAuth());
        // axios.defaults.withCredentials = true;
        // axios
        //     .get("http://localhost:5000/users/authchecker",{withCredentials:true})
        //     .then((res) =>
        //         console.log(res.data)
        //     );
    }

    // static propTypes = {
    //     button: PropTypes.bool,
    //     isAuthenticated: PropTypes.bool,
    // };
    static propTypes = {
        button: PropTypes.bool,
        authState: PropTypes.object.isRequired,
        buttonReset: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
    };

    render() {
        if(this.props.authState.isAuthenticated) {
            return (
                <section>
                    <NavBar/>
                    <ProductConsumer>
                        {value => {
                            const {cart} = value;

                            if (cart.length > 0) {
                                return (
                                    <React.Fragment>
                                        <Titles name="Your " title="Cart">Cart</Titles>
                                        <CartColumns/>
                                        <CartList value={value}/>
                                        <CartTotals value={value}/>
                                    </React.Fragment>
                                );
                            } else {
                                return (
                                    <EmptyCart/>
                                );
                            }
                        }}
                    </ProductConsumer>
                </section>
            );
        } else {
            return (
                <section>
                    <NavBar/>
                    <p>Please log in</p>
                </section>
            );
        }
    }
}

const mapStateToProps = (state) => ({ //Maps state to redux store as props
    button: state.ui.button,
    authState: state.auth
});
export default connect(mapStateToProps, { buttonReset })(Cart);