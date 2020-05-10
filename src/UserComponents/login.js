import React, {Component} from "react";
import { connect } from 'react-redux';
import {Card, CardTitle, CardSubtitle, CardBody} from "reactstrap";
import {Link, Redirect} from 'react-router-dom';
import {login } from './actions/session';
import '../style.css';
import NavBar from "./NavBar";
import session from "./reducers/session/session";


const mapStateToProps = ({errors, session}) => ({
    errors, session
});

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user))
});

const Login = ({errors, login}) => {

    const handleSubmit = e => {
        e.preventDefault();

        const user = {
            email: e.target[0].value,
            password: e.target[1].value
        };

        login(user);

    };

    return(
        <React.Fragment>
            <NavBar/>
            <div>
                <Card>
                    <CardBody >
                        <CardTitle> <h2><strong>Login</strong></h2></CardTitle>
                        <CardSubtitle className="text-muted">Don't have an account?
                            <Link to="/register"> Register. </Link></CardSubtitle>
                        <br/>

                        <form onSubmit={handleSubmit}>
                            <label>
                                Email:
                                <input type="email" name="email"/>
                            </label>
                            <label>
                                Password:
                                <input type="password" name="password"/>
                            </label>

                            <input type="submit" value="Submit"/>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </React.Fragment>
        //     <h1>Login</h1>
        //     <p>{errors}</p>
        //
        //     // <form onSubmit={handleSubmit}>
        //     //     <label>
        //     //         Email:
        //     //         <input type="email" name="email"/>
        //     //     </label>
        //     //     <label>
        //     //         Password:
        //     //         <input type="password" name="password"/>
        //     //     </label>
        //     //
        //     //     <input type="submit" value="Submit"/>
        //     // </form>
        //
        //     <Link to="/register">Signup</Link>
        // </>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);