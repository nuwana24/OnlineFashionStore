import React,{Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, Col, Jumbotron, Row} from "react-bootstrap";
import {Route} from "react-router";
import {login} from "../../UserComponents/actions/session";
import {connect} from "react-redux";
import LoginNav from "../LoginNav";
import {Link} from "react-router-dom";



const mapStateToProps = ({errors, session}) => ({
    errors, session
});

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user))
});


const AdminLogin = ({session, login, ...props}) => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email: e.target[0].value,
            password: e.target[1].value
        };

        let loginToken = await login(user);
        console.log(loginToken);

        if (loginToken.type === 'RECEIVE_CURRENT_USER') {
            if (loginToken.user.username === 'Admin')
                props.history.push('/Admin');
            else if (loginToken.user.username.indexOf('Store') >= 0)
                props.history.push('/Manager');
            else
                alert('Invalid Credentials please try again');
        } else
            alert('Invalid Credentials please try again');


    }




    return (
        <div align='center' style={{minHeight:'50vh'}}>
            <div id="page-container">
            <MuiThemeProvider>
                <LoginNav/>
                <divç>

                    <form onSubmit={handleSubmit}>
                        {/*<Row xs={1} md={2}>*/}
                    <Col className="bg-light " style={{minHeight: '40rem',minWidth:'30px'}}>
                        <Card  style={{minWidth:'40px',minHeight:'42rem',marginTop:'3.5rem'}}>
                            <h4 style={{marginTop:'5rem'}} className='text-info font-weight-bold'>Admin and Manager Login</h4>
                        <div align='center'>
                            <TextField
                                variant="outlined"
                                hintText="Enter your Email"
                                floatingLabelText="Email"
                                style={{marginTop:'5rem'}}
                            />
                            <br/>
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                            />
                            <br/>
                            <input type="submit" value="Login" className="btn btn-info btn-block" style={{width:'200px'}}></input>
                        </div>

                           <Link to={'/'} className='text-dark mt-3' > Not an admin or a store manager?</Link>
                        </Card>
                    </Col>
                        {/*</Row>*/}
                    </form>
                </divç>

            </MuiThemeProvider>
        </div>

        </div>

    )


// }


}
export default connect(
        mapStateToProps,
        mapDispatchToProps
)(AdminLogin);
