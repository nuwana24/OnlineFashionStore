import React from "react";
import { connect } from 'react-redux';
import { Link} from "react-router-dom";
import { signup} from "./actions/session";
import {Card, CardTitle, CardSubtitle, CardBody} from "reactstrap";
import NavBar from "./NavBar";

const mapStateToProps = ({errors}) => ({
    errors
});

const mapDispatchToProps = dispatch => ({
    signup: user => dispatch(signup(user))
});

const Signup = ({errors, signup}) => {

    const handleSubmit = e => {
        e.preventDefault();

        const user = {
            username: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value
        };

        signup(user);
    };

    return(
        <React.Fragment>
            <NavBar/>
            <Card>
                <CardBody>
                    <CardTitle>
                        <h2>
                            <strong>Register</strong>
                        </h2>
                    </CardTitle>
                    <CardSubtitle className="text-muted">
                        Already have an account?
                        <Link to="/login"> Log In. </Link>
                    </CardSubtitle>
                    <br />
                    <p>{errors}</p>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Username:
                                <input type="text" name="username"/>
                            </label>
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
                <Link to="/login">Login</Link>
            </Card>
        </React.Fragment>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);