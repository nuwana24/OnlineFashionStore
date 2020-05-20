import React, {Component, useEffect, useState} from "react";
import {Card, Carousel, Col, Container, Image, Jumbotron, Row} from "react-bootstrap";
import try1 from '../../Images/AdminBackgroud.jpg'
import addCat from '../../Images/Add_category.png'
import manUsers from '../../Images/ManagerUsers.png'
import insights from '../../Images/dashboard.png'
import {render} from "react-dom";
import {Link, Redirect} from "react-router-dom";
import NavBar from "./NavBar";
import {connect} from "react-redux";
import AppCSS from "../../App.css";
import axios from "axios";
import {ProductConsumer} from "../../context";

const mapStateToProps = ({session}) => ({
    session
});



class AdminMain extends Component{
    constructor(props) {
        super(props);
        this.state= {
            ManagerCount:0,
            ItemCount:0,
            TotalItemCost:0,
            items:[],
            orders:[],
            loading:true


        }
    }


    componentDidMount() {


        axios.get('http://localhost:5000/managers/')
            .then(response => {
                this.setState({
                    ManagerCount : response.data.length,
                    loading:false
                })

            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('http://localhost:5000/additem/')
            .then(response => {
                this.setState({
                    items:response.data,
                    ItemCount:response.data.length
                })
            })

            .catch((error) => {
                console.log(error);
            })
        axios.get('http://localhost:5000/api/cart/getOrder')
            .then(response => {
                this.setState({
                    orders:response.data.data,
                })
            })

            .catch((error) => {
                console.log(error);
            })
    }



    render() {
      var Mcount = this.state.ManagerCount;
      var ItemCount = this.state.ItemCount;
      var totPrice = 0;
      var totSales = 0;

      this.state.items.map(item =>
      {
          totPrice = totPrice + (item.price * item.quantity);
      })

        this.state.orders.map(order =>{
            order.orders.map(orderD => {
                totSales = totSales + (parseInt(orderD.price)* orderD.quantity);
            })

        })


        if (this.props.session.userId !== null) {
            return (
                <div id="page-container">
                    <header className="Admin">
                        <NavBar/>
                        <center>
                        {/*Body-Main*/}
                        <Jumbotron fluid>
                            <Container>

                                    <h1>Hello {this.props.session.username}!, WELCOME TO THE ADMIN PAGE</h1>


                            </Container>
                        </Jumbotron>

                        <center>
                            <div style={{display: "inline-block"}} className='ml-3'>

                                <Card style={{width: '20rem', flex: 2, display: "inline-block"}} className="mr-5 mt-5" bg='warning' text='light'>

                                    <Card.Body>
                                        <Card.Title style={{fontSize: "50px", fontFamily: "Open-Sans",color:"white"}} >{Mcount}</Card.Title>
                                        <Card.Text>Number of Store managers </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card style={{width: '20rem', flex: 2, display: "inline-block"}} className="mr-5 mt-5" bg='info' text='light'>

                                    <Card.Body>
                                        <Card.Title style={{fontSize: "50px", fontFamily: "Open-Sans",color:"white"}}>{ItemCount}</Card.Title>
                                        <Card.Text>Number of Product types </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card style={{width: '20rem', flex: 2, display: "inline-block"}} className="mr-5 mt-5" bg='success' text='light'>

                                    <Card.Body>
                                        <Card.Title style={{fontSize: "50px", fontFamily: "Open-Sans",color:"white"}}>Rs.{totPrice}</Card.Title>
                                        <Card.Text >Total value of the products available</Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card style={{width: '20rem', flex: 2, display: "inline-block"}} className="mr-5 mt-5" bg='primary' text='light'>

                                    <Card.Body>
                                        <Card.Title style={{fontSize: "50px", fontFamily: "Open-Sans",color:"white"}}>Rs.{totSales}</Card.Title>
                                        <Card.Text >Sales upto date</Card.Text>
                                    </Card.Body>
                                </Card>



                            </div>
                        </center>


                        <br/> <br/>
                        </center>
                    </header>
                </div>

            )


        } else {
            return (
                <Redirect to={'/AdLog'}></Redirect>
            )
        }

    }
}
export default connect(
    mapStateToProps
)(AdminMain);

