import React,{Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Jumbotron} from "react-bootstrap";
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

// const style = {
//     margin: 15,
// };

const AdminLogin = ({session, login, ...props}) => {

   let logged = false;
    let incorrectLogin='';
    const handleSubmit = e => {
        e.preventDefault();

        const user = {
            email: e.target[0].value,
            password: e.target[1].value
        };


        login(user);





             if (session.username === null) {
               alert('Re-submit or Enter username and password again');
            }
             else if (session.username === 'Admin') {
                props.history.push('/Admin');
            }
             else if (session.username.indexOf('Store') >= 0) {
                 props.history.push('/Manager');
             }







        // console.log(login(user));
        //
        // console.log(session.username);
        //


    }
    return (
        <div align='center'>
            <MuiThemeProvider>
                <LoginNav/>
                <div className="container-fluid align-items-center">

                    <Jumbotron className="bg-info text-light ">
                        <h1>Admin and Manager Login</h1>
                    </Jumbotron>
                    <form onSubmit={handleSubmit}>
                        <p>{incorrectLogin}</p>
                    <div className="bg-light" style={{height: '100%', width: 'wrap-content'}}>
                        <TextField
                            variant="outlined"
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            // onChange={(event, newValue) => this.setState({username: newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            // onChange={(event, newValue) => this.setState({password: newValue})}
                        />
                        <br/>
                        <input type="submit" value="Login" className="btn btn-info btn-block" style={{width:'200px'}}></input>
                        {/*<RaisedButton label="Submit" primary={true} style={style} type="submit"/>*/}
                    </div>
                    </form>
                </div>
            </MuiThemeProvider>
        </div>
    )


// }


}
export default connect(
        mapStateToProps,
        mapDispatchToProps
)(AdminLogin);