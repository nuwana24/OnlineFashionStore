import React, {Component} from "react";
import NavBar from "./NavBar";
import FooterPage from "./Footer";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import background from '../Images/AdminBackgroud.jpg';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from 'emailjs-com';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

var sectionstyle ={
    backgroundImage: `url(${background})`
}

const mapStateToProps = ({ session}) => ({
    session
});

 class EditStoreManager extends Component {
     constructor(props) {
         super(props);

         this.onChangefirstName = this.onChangefirstName.bind(this);
         this.onChangelastName = this.onChangelastName.bind(this);
         this.onChangeEmail = this.onChangeEmail.bind(this);
         this.onChangePassword = this.onChangePassword.bind(this);
         this.onChangePassword2 = this.onChangePassword2.bind(this);
         this.onChangeGender = this.onChangeGender.bind(this);
         this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
         this.onChangeAddress = this.onChangeAddress.bind(this);
         this.onChangeAddress2 = this.onChangeAddress2.bind(this);
         this.onChangeCity = this.onChangeCity.bind(this);
         this.onChangeZip = this.onChangeZip.bind(this);
         this.onSubmit = this.onSubmit.bind(this);

         this.state = {
             firstName: '',
             lastName: '',
             email: '',
             genders: ['Male', 'Female', 'Prefer not to say'],
             gender: '',
             password: '',
             password2:'',
             dateOfBirth: new Date().getDate(),
             Address: '',
             Address2: '',
             city: '',
             zip: 0,
             managers: [],
             passwordV: '',
             pwdFormat: '',
         }
     }


     componentDidMount() {
         axios.get('/managers/' + this.props.match.params.id)
             .then(response => {
                 this.setState({
                     firstName: response.data.firstName,
                     lastName: response.data.lastName,
                     email: response.data.email,
                     gender: response.data.gender,
                     password: response.data.password,
                     dateOfBirth: new Date(response.data.dateOfBirth),
                     Address: response.data.Address,
                     Address2: response.data.Address2,
                     city: response.data.city,
                     zip: response.data.zip,
                     validation: false
                 })

             })
             .catch(function (error) {
                 console.log(error);
             })
         axios.get('/managers/')
             .then(response => {
                 if (response.data.length > 0) {
                     this.setState({
                         managers: response.data.map(manager => manager.firstName)
                     })
                 }
             })
     }

     onChangefirstName(e) {
         this.setState({
             firstName: e.target.value
         });
     }

     onChangelastName(e) {
         this.setState({
             lastName: e.target.value
         });
     }

     onChangeEmail = (e) => {
         this.setState({
             email: e.target.value
         });
     }

     onChangePassword(e) {
         this.setState({
             password: e.target.value
         });
     }

     onChangePassword2(e) {
         this.setState({
             password2: e.target.value
         });
     }

     onChangeGender(e) {
         this.setState({
             gender: e.target.value
         });
     }

     onChangeDateOfBirth(date) {
         this.setState({
             dateOfBirth: date
         });
     }

     onChangeAddress(e) {
         this.setState({
             Address: e.target.value
         });
     }

     onChangeAddress2(e) {
         this.setState({
             Address2: e.target.value
         });
     }

     onChangeCity(e) {
         this.setState({
             city: e.target.value
         });
     }

     onChangeZip(e) {
         this.setState({
             zip: e.target.value
         });
     }


     onSubmit(e) {
         e.preventDefault();

         const manager = {
             firstName: this.state.firstName,
             lastName: this.state.lastName,
             email: this.state.email,
             gender: this.state.gender,
             password: this.state.password,
             dateOfBirth: this.state.dateOfBirth,
             Address: this.state.Address,
             Address2: this.state.Address2,
             city: this.state.city,
             zip: this.state.zip
         }


         if (new RegExp((/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)).test(this.state.password)) {
             this.setState({
                 validation: true
             })
         } else {
             this.setState({
                 pwdFormat: "The password should contain atleast one number,character and a special character",
                 validation: false,
             })
         }
         if (this.state.password2 !== this.state.password) {
             this.setState({
                 passwordV: "Re-entered password do not match the password!",
                 validation: false,
             })
         } else {
             this.setState({
                 validation: true
             })
         }
         if (this.state.validation === true) {
             axios.post('/managers/update/' + this.props.match.params.id, manager)
                 .then(res => console.log(res.data));

             this.setState({
                 passwordV: '',
                 pwdFormat: '',
             })
             this.props.history.push({
                 pathname: '/ViewManager',
                 details: axios.get('/managers/')
                     .then(response => {
                         if (response.data.length > 0) {
                             this.setState({
                                 managers: response.data.map(manager => manager.firstName)
                             })
                         }
                     })
             });
             alert('Manager updated');
         }

     }

     render() {

         if (this.props.session.username !== null) {
             return (
                 <header>
                     <script type='text/javascript'
                             src='https://cdn.jsdelivr.net/npm/emailjs-com@2.4.1/dist/email.min.js'></script>
                     <script type='text/javascript'>
                         {(function () {
                             emailjs.init('user_9WG54Qaz01s5b2BnGY2Jq');
                         })()}
                     </script>
                     <div id="page-container">
                     <NavBar/>
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
                                                 <center>Edit stock Manager details</center>
                                             </h2>
                                             <Form onSubmit={this.onSubmit}>
                                                 <Form.Row>
                                                     <Form.Group as={Col} controlId="formGridFname">
                                                         <Form.Label>First Name</Form.Label>
                                                         <Form.Control type="text" placeholder="Enter First Name"
                                                                       value={this.state.firstName}
                                                                       onChange={this.onChangefirstName}/>
                                                     </Form.Group>
                                                     <Form.Group as={Col} controlId="formGridLname">
                                                         <Form.Label>Last Name</Form.Label>
                                                         <Form.Control required
                                                                       placeholder="Enter Last Name"
                                                                       onChange={this.onChangelastName}
                                                                       value={this.state.lastName}/>
                                                     </Form.Group>
                                                 </Form.Row>
                                                 <Form.Row>
                                                     <Form.Group as={Col} controlId="formGridEmail">
                                                         <Form.Label>Email</Form.Label>
                                                         <Form.Control type="email" placeholder="Enter email"
                                                                       onChange={this.onChangeEmail}
                                                                       value={this.state.email}
                                                                       required/>
                                                     </Form.Group>
                                                 </Form.Row>
                                                 <Form.Row>
                                                     <Form.Group as={Col} controlId="formGridPassword">
                                                         <Form.Label>Password</Form.Label>
                                                         <Form.Control type="password" placeholder="Password"
                                                                       onChange={this.onChangePassword}
                                                                       required/>
                                                         <p style={{
                                                             color: "red",
                                                             fontSize: "smaller"
                                                         }}>{this.state.pwdFormat}</p>
                                                     </Form.Group>

                                                     <Form.Group as={Col} controlId="formGridRePassword">
                                                         <Form.Label>Re-enter Password</Form.Label>
                                                         <Form.Control type="password" placeholder="Re-enter Password"
                                                                       onChange={this.onChangePassword2}
                                                                       value={this.state.password2}
                                                                       required/>
                                                         <p style={{
                                                             color: "red",
                                                             fontSize: "smaller"
                                                         }}>{this.state.passwordV}</p>
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
                                                         <Form.Control as="select" placeholder="Choose..."
                                                                       onChange={this.onChangeGender}
                                                                       value={this.state.gender}
                                                                       required>
                                                             {
                                                                 this.state.genders.map(function (gender) {
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
                                                     <Form.Control placeholder="1234 Main St"
                                                                   onChange={this.onChangeAddress}
                                                                   value={this.state.Address}
                                                                   required/>
                                                 </Form.Group>

                                                 <Form.Group controlId="formGridAddress2">
                                                     <Form.Label>Address 2</Form.Label>
                                                     <Form.Control placeholder="Address part 2"
                                                                   onChange={this.onChangeAddress2}
                                                                   value={this.state.Address2}
                                                                   required/>
                                                 </Form.Group>

                                                 <Form.Row>
                                                     <Form.Group as={Col} controlId="formGridCity">
                                                         <Form.Label>City</Form.Label>
                                                         <Form.Control onChange={this.onChangeCity}
                                                                       value={this.state.city}
                                                                       required />
                                                     </Form.Group>

                                                     <Form.Group as={Col} controlId="formGridZip">
                                                         <Form.Label>Zip</Form.Label>
                                                         <Form.Control onChange={this.onChangeZip}
                                                                       value={this.state.zip}
                                                                       required/>
                                                     </Form.Group>
                                                 </Form.Row>

                                                 <Form.Group id="formGridCheckbox">
                                                     <Form.Check type="checkbox" label="Notify by email"/>
                                                 </Form.Group>
                                                 <center>
                                                     <Button variant="info btn-lg" type="submit">
                                                         Update
                                                     </Button>
                                                 </center>
                                             </Form>
                                         </div>
                                     </Col>

                                 </Container>
                             </section>
                         </div>
                     </div>
                     </div>
                 </header>
             );
         } else {
             return (
                 <Redirect to="/AdLog"/>
             );
         }
     }
 }
export default connect(
    mapStateToProps
)(EditStoreManager);

