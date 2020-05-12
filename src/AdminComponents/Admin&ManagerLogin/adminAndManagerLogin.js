import React,{Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Jumbotron} from "react-bootstrap";
import {Route} from "react-router";
class AdminAndManagerLogin extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    handleClick(e){
        if(this.state.username =='admin'){
            window.location = 'Admin';
        }
        if(this.state.username == 'manager'){
            window.location = 'Manager'
        }
    }
    render() {
        return (
            <div align='center'>
                <MuiThemeProvider>
                    <div className="container-fluid align-items-center">
                       <Jumbotron className="bg-info text-light ">
                          <h1>Admin and Manager Login</h1>
                       </Jumbotron>
                        <div className="bg-light" style={{height: '100%',width:'wrap-content'}}>
                        <TextField
                            variant="outlined"
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default AdminAndManagerLogin;