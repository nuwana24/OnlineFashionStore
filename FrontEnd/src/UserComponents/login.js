import React, {Component} from "react";
import { connect } from 'react-redux';
import {Card, CardTitle, CardSubtitle, CardBody} from "reactstrap";
import {Link, Redirect} from 'react-router-dom';
import {login } from './actions/session';
import '../style.css';
import LoginNav from "../AdminComponents/LoginNav";

const mapStateToProps = ({errors, session}) => ({
    errors, session
});

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user))
});

const delay = (milliSeconds) => {

    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliSeconds);

};

const Login = ({session, login, errors, ...props}) => {

    const handleSubmit = e => {
        e.preventDefault();

        const user = {
            email: e.target[0].value,
            password: e.target[1].value
        };

        login(user);
        delay(1000);
        props.history.push("/")

    };

    return(
        <React.Fragment >
            <LoginNav />
            <div className="my-lg-5"style={{minHeight:'60vh'}}>
                <Card className="bg-light mb-3 text-center w-50 mx-auto">
                    <CardBody >
                        <CardTitle> <h2><strong>Login</strong></h2></CardTitle>
                        <CardSubtitle className="text-muted">Don't have an account?
                            <Link to="/register"> Register. </Link></CardSubtitle>
                        <br/>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group text-left">
                                <label>Email:</label>
                                <input type="email" name="email" className="form-control"/>
                            </div>
                            <div className="form-group text-left">
                                <label>Password:</label>
                                <input type="password" name="password" className="form-control"/>
                            </div>

                            <input type="submit" value="Login" className="btn btn-primary btn-block"/>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
