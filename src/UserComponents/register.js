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

const Signup = ({errors, signup, ...props}) => {

    const handleSubmit = e => {
        e.preventDefault();

        const user = {
            username: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value
        };

        signup(user);

        props.history.push("/")
    };

    return(
        <React.Fragment>
            <NavBar/>
            <Card className="bg-light mb-3 text-center w-50 mx-auto my-lg-5">
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
                            <div className="form-group text-left">
                                <label>Username:</label>
                                <input type="text" name="username" className="form-control"/>
                            </div>

                            <div className="form-group text-left">
                                <label>Email:</label>
                                <input type="email" name="email" className="form-control"/>

                            </div>

                            <div className="form-group text-left">
                                <label>Password:</label>
                                <input type="password" name="password" className="form-control"/>

                            </div>

                            <input type="submit" value="Register" className="btn btn-success btn-block"/>
                        </form>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);