import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// import Container from "@material-ui/core/Container";
import NavBar from "./NavBar";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

export default class CreateLogin2 extends Component {
    constructor(props) {
        super(props);


        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            dateOfBirth: new Date(),
            genders: ['Male','Female','Prefer not to say'],
            gender:'',
            email:'',
            password:'',
            Address: '',
        }
    }


    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        })
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        })
    }
    onChangeDateOfBirth(date) {
        this.setState({
            dateOfBirth: date
        })
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeAddress(e) {
        this.setState({
            Address: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();

        const manager = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
            gender: this.state.gender,
            email: this.state.email,
            password:this.state.password,
            Address: this.state.Address,
        }

        console.log(manager);

        axios.post('http://localhost:5000/managers/add', manager)
            .then(res => console.log(res.data));

        window.location = '/CreateLogin2';
    }

    render() {
        return (
            <div>
                <NavBar />
                <Container>
                <h3>Create Manager Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>First Name </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.firstName}
                                onChange={this.onChangeFirstName}
                        />
                        <label>Last Name </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.lastName}
                                onChange={this.onChangeLastName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date of Birth: </label>
                        <div>
                            <DatePicker
                                selected={this.state.dateOfBirth}
                                onChange={this.onChangeDateOfBirth}
                            />
                        </div>
                        <label>Gender </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.gender}
                                onChange={this.onChangeGender}>
                            {
                                this.state.genders.map(function(gender) {
                                    return <option
                                        key={gender}
                                        value={gender}>{gender}
                                    </option>;
                            })
                        }
                                {/*<option key="M" value="Male">Male</option>*/}
                                {/*<option key="F" value="Female">Female</option>*/}
                                {/*<option key="N" value="Prefer NOT">Prefer not to say</option>*/}
                        </select>
                        {/*<input*/}
                        {/*    type="text"*/}
                        {/*    className="form-control"*/}
                        {/*    value={this.state.gender}*/}
                        {/*    onChange={this.onChangeGender}*/}
                        {/*/>*/}
                    </div>
                    <div className="form-group">
                        <label>Email </label>
                        <input  type="email"
                                required
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password </label>
                        <input  type="password"
                                required
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                        />
                        <label>Re-enter password</label>
                        <input  type="password"
                                required
                                className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.Address}
                            onChange={this.onChangeAddress}

                        />
                    </div>


                    <div className="form-group">
                        <input type="submit" value="Create Admin Login" className="btn btn-info" />
                    </div>
                </form>
                </Container>
            </div>
        )
    }
}