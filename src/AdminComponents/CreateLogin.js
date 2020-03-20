import React, {Component} from "react";
import NavBar from "./NavBar";
import FooterPage from "./Footer";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import background from '../Images/AdminBackgroud.jpg';

var sectionstyle ={
    backgroundImage: `url(${background})`
}
export default class CreateLogin extends Component {
   constructor(props) {
       super(props);

       this.onChangeEmail = this.onChangeEmail.bind(this);
       this.onChangePassword = this.onChangePassword.bind(this);
       this.onChangeRePassword = this.onChangeRePassword.bind(this);
       this.onChangeGender = this.onChangeGender.bind(this);
       this.onChangeDOB = this.onChangeDOB.bind(this);
       this.onChangeAddress = this.onChangeAddress.bind(this);
       this.onChangeAddress2 = this.onChangeAddress2.bind(this);
       this.onChangeCity = this.onChangeCity.bind(this);
       this.onChangeStates = this.onChangeStates.bind(this);
       this.onChangeZip = this.onChangeZip.bind(this);
       this.onSubmit = this.onSubmit.bind(this);

       this.state ={
           email : '',
           gender:'',
           password :'',
           rePassword :'',
           DOB : new Date(),
           Address : '',
           Address2 : '',
           city : '',
           states :'',
           zip : 0
       }
   }

   componentDidMount() {
   }

    onChangeEmail=(e)=>{
       this.setState({
           email: e.target.value
       });
   }
   onChangePassword(e){
       this.setState({
           password: e.target.value
       });
   }
   onChangeRePassword(e){
       this.setState({
           rePassword: e.target.value
       });
   }
    onChangeGender(e){
        this.setState({
            gender: e.target.value
        });
    }
   onChangeDOB(date){
       this.setState({
           DOB: date
       });
   }
   onChangeAddress(e){
       this.setState({
           Address: e.target.value
       });
   }
   onChangeAddress2(e){
       this.setState({
           Address2: e.target.value
       });
   }

   onChangeCity(e){
       this.setState({
           city: e.target.value
       });
   }
   onChangeStates(e){
       this.setState({
           states: e.target.value
       });
   }

   onChangeZip(e){
       this.setState({
           zip: e.target.value
       });
   }



   onSubmit(e){
       e.preventDefault();

       const manager = {
           email:this.state.email,
           password: this.state.password,
           rePassword: this.state.rePassword,
           gender: this.state.gender,
           DOB: this.state.DOB,
           Address: this.state.Address,
           Address2: this.state.Address2,
           city: this.state.city,
           states: this.state.states,
           zip: this.state.zip
       }
       console.log(manager)

       window.location = '/CreateLogin';
   }
    render() {


        return (
            <header>
                <NavBar />
                <div>
                    <div>
                        <section style={sectionstyle}>
                            <Container>

                                <Col>

                                </Col>
                                <Col>

                                </Col>

                                <Col>
                                    <div className="FormAddLogin" className="p-3 mb-2 bg-light text-dark">
                                        <h2>
                                            <center>Add a Login for a stock Manager</center>
                                        </h2>
                                        <form onSubmit={this.onSubmit}>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridEmail">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="email" placeholder="Enter email" onChange = {this.onChangeEmail} value = {this.state.email}/>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridPassword">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password" onChange = {this.onChangePassword} value = {this.state.password}/>
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridPassword">
                                                    <Form.Label>Re-enter Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Re-enter Password" onChange = {this.onChangeRePassword} value = {this.state.rePassword}/>
                                                </Form.Group>

                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="fromGridDOB">
                                                    <Form.Label>Date of Birth</Form.Label>
                                                    <Form.Control type="date" placeholder="" onChange = {this.onChangeDOB} />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="fromGridGender">
                                                    <Form.Label>Gender</Form.Label><br/>
                                                    <Form.Control as="select" placeholder="Choose..." onChange = {this.onChangeGender} value = {this.state.gender}>
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                        <option>Prefer not to say</option>
                                                    </Form.Control>
                                                </Form.Group>

                                            </Form.Row>
                                            <Form.Group controlId="formGridAddress1">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control placeholder="1234 Main St" onChange = {this.onChangeAddress} value = {this.state.Address}/>
                                            </Form.Group>

                                            <Form.Group controlId="formGridAddress2">
                                                <Form.Label>Address 2</Form.Label>
                                                <Form.Control placeholder="Apartment, studio, or floor" onChange = {this.onChangeAddress2} value = {this.state.Address2}/>
                                            </Form.Group>

                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridCity"  >
                                                    <Form.Label>City</Form.Label>
                                                    <Form.Control onChange = {this.onChangeCity} value = {this.state.city}/>
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridState" >
                                                    <Form.Label>State</Form.Label>
                                                    <Form.Control as="select"  onChange = {this.onChangeStates} value = {this.state.states}>
                                                        <option>Choose...</option>
                                                        <option>...</option>
                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridZip">
                                                    <Form.Label>Zip</Form.Label>
                                                    <Form.Control  onChange = {this.onChangeZip} value = {this.state.zip}/>
                                                </Form.Group>
                                            </Form.Row>

                                            <Form.Group id="formGridCheckbox">
                                                <Form.Check type="checkbox" label="Notify by email"/>
                                            </Form.Group>
                                            <center>
                                                <Button variant="info btn-lg" type="submit">
                                                    Submit
                                                </Button>
                                            </center>
                                        </form>
                                    </div>
                                </Col>

                            </Container>
                        </section>
                    </div>
                </div>
            </header>
        );
    }
}

