import React, {Component} from "react";
import NavBar from "./NavBar";
import FooterPage from "./Footer";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import background from '../Images/AdminBackgroud.jpg';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from 'emailjs-com';

var sectionstyle ={
    backgroundImage: `url(${background})`
}
export default class CreateLogin extends Component {
   constructor(props) {
       super(props);

       this.onChangefirstName = this.onChangefirstName.bind(this);
       this.onChangelastName = this.onChangelastName.bind(this);
       this.onChangeEmail = this.onChangeEmail.bind(this);
       this.onChangePassword = this.onChangePassword.bind(this);
       this.onChangeGender = this.onChangeGender.bind(this);
       this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
       this.onChangeAddress = this.onChangeAddress.bind(this);
       this.onChangeAddress2 = this.onChangeAddress2.bind(this);
       this.onChangeCity = this.onChangeCity.bind(this);
       this.onChangeZip = this.onChangeZip.bind(this);
       this.onSubmit = this.onSubmit.bind(this);

       this.state ={
           firstName:'',
           lastName:'',
           email : '',
           genders: ['Male','Female','Prefer not to say'],
           gender:'',
           password :'',
           dateOfBirth : new Date(),
           Address : '',
           Address2 : '',
           city : '',
           zip : 0
       }
   }


    onChangefirstName(e){
        this.setState({
            firstName: e.target.value
        });
    }
    onChangelastName(e){
        this.setState({
            lastName: e.target.value
        });
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
    onChangeGender(e){
        this.setState({
            gender: e.target.value
        });
    }
   onChangeDateOfBirth(date){
       this.setState({
           dateOfBirth: date
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

   onChangeZip(e){
       this.setState({
           zip: e.target.value
       });
   }



   onSubmit(e){
       e.preventDefault();

       const manager = {
           firstName: this.state.firstName,
           lastName: this.state.lastName,
           email: this.state.email,
           gender: this.state.gender,
           password:this.state.password,
           dateOfBirth: this.state.dateOfBirth,
           Address: this.state.Address,
           Address2: this.state.Address2,
           city: this.state.city,
           zip: this.state.zip
       }
       console.log(manager)
       axios.post('http://localhost:5000/managers/add', manager)
           .then(res => console.log(res.data));

       const template_params = {
           _semail: 'rashinikavindya@gmail.com',
           _sfirstName: 'Rashini',
           _spassword: 'this.password'
       };

       // var service_id = "default_service";
       // var template_id = "manager_added";
       // emailjs.send(service_id, template_id, template_params);
       emailjs.send('gmail', 'manager_added', template_params,'user_9WG54Qaz01s5b2BnGY2Jq')
           .then((response) => {
               console.log('SUCCESS!', response.status, response.text);
           }, (err) => {
               console.log('FAILED...', err);
           });;

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
                                        <Form onSubmit={this.onSubmit}>
                                            <Form.Row>
                                            <Form.Group as={Col} controlId="formGridFname">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control  type = "text" placeholder="Enter First Name"  value = {this.state.firstName} onChange = {this.onChangefirstName}/>
                                            </Form.Group>
                                                <Form.Group as={Col} controlId="formGridLname">
                                                    <Form.Label>Last Name</Form.Label>
                                                    <Form.Control placeholder="Enter Last Name" onChange = {this.onChangelastName} value = {this.state.lastName}/>
                                                </Form.Group>
                                        </Form.Row>
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

                                                <Form.Group as={Col} controlId="formGridRePassword">
                                                    <Form.Label>Re-enter Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Re-enter Password" />
                                                </Form.Group>

                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="fromGridDOB">
                                                    {/*<Form.Label>Date of Birth</Form.Label>*/}
                                                    {/*<Form.Control type="date"  onChange = {this.onChangeDateOfBirth} selected = {this.state.dateOfBirth}/>*/}

                                                    <label>Date of Birth: </label>
                                                    <div>
                                                        <DatePicker
                                                            selected={this.state.dateOfBirth}
                                                            onChange={this.onChangeDateOfBirth}
                                                        />
                                                    </div>
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="fromGridGender">
                                                    <Form.Label>Gender</Form.Label><br/>
                                                    <Form.Control as="select"  placeholder="Choose..." onChange = {this.onChangeGender} value = {this.state.gender}>
                                                        {
                                                            this.state.genders.map(function(gender) {
                                                                return <option
                                                                    key={gender}
                                                                    value={gender}>{gender}
                                                                </option>;
                                                            })
                                                        }
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
                                        </Form>
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

