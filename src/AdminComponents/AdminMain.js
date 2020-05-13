import React, {Component, useEffect, useState} from "react";
import {Card, Carousel, Col, Container, Image, Jumbotron, Row} from "react-bootstrap";
import try1 from '../Images/AdminBackgroud.jpg'
import addCat from '../Images/Add_category.png'
import manUsers from '../Images/ManagerUsers.png'
import insights from '../Images/dashboard.png'
import {render} from "react-dom";
import {Link, Redirect} from "react-router-dom";
import NavBar from "./NavBar";
import {connect} from "react-redux";
import Axios from "axios";

const mapStateToProps = ({session}) => ({
    session
});


const AdminMain = ({session}) =>{

    if(session.userId !== null) {
        return (

            <header className="Admin">
                <NavBar/>

                {/*Body-Main*/}
                <Jumbotron fluid>
                    <Container>
                        <center>
                            <h1>Hi {session.username}!, WELCOME TO THE ADMIN PAGE</h1>

                        </center>
                    </Container>
                </Jumbotron>

                <Container>
                    <Row>
                        <Col>
                            <Card style={{width: '18rem', height: '18rem'}}>
                                <Card.Img variant="top" src={addCat}/>
                                <Card.Body>
                                    <Card.Title>
                                        <center><a href="#"><Link to={'/AddCategory'}>Add Categories</Link></a></center>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                            <br/>

                        </Col>
                        <Col>
                            <Card style={{width: '18rem', height: '18rem'}}>
                                <Card.Img variant="top" src={manUsers}/>
                                <Card.Body>
                                    <Card.Title>
                                        <center><Link to={'/CreateLogin'}>Manage Users</Link></center>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                            <br/>

                        </Col>
                        <Col>
                            <Card style={{width: '18rem', height: '18rem'}}>
                                <Card.Img variant="top" src={insights}/>
                                <Card.Body>
                                    <Card.Title>
                                        <center><a href="#">View insights</a></center>
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                            <br/>

                        </Col>
                    </Row>
                </Container>

                <br/> <br/>
            </header>
        );

    }
    else{
        return (
            <Redirect to={'/AdLog'}></Redirect>
        )
    }


}
export default connect(
    mapStateToProps
)(AdminMain);

