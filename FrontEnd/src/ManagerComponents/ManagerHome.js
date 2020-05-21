import React, {Component} from "react";
import {Card, Carousel, Col, Container, Image, Jumbotron, Row} from "react-bootstrap";
import addIteam from '../Images/add_item.jpg'
import addSale from '../Images/add_discount.jpg'
import editItem from '../Images/edit_item.jpg'
import {render} from "react-dom";
import {Link, Redirect} from "react-router-dom";
import NavBar from "./NavBar";
import {connect} from "react-redux";


const mapStateToProps = ({session}) => ({
    session
})


class ManagerHome extends Component{
    render(){


        if (this.props.session.username !== null) {

            return (

                <header className="Manager">
                    <NavBar/>

                    {/*Body-Main*/}
                    <Jumbotron fluid>
                        <Container>
                            <center>
                                <h1>Manager Privileges</h1>

                            </center>
                        </Container>
                    </Jumbotron>

                    <Container>
                        <Row>
                            <Col>
                                <Link to={"/addItem"}>
                                    <Card style={{width: '18rem', height: '18rem'}}>
                                        <Card.Img variant="top" src={addIteam}/>
                                        <Card.Body>
                                            {/*<a href="http://localhost:3000/addItem"></a>*/}
                                            {/*<a onClick={"http://localhost:3000/addItem"}></a>*/}
                                        </Card.Body>
                                    </Card>
                                </Link>
                                <br/>

                            </Col>
                            <Col>
                                <Link to={"/addDiscount"}>
                                    <Card style={{width: '18rem', height: '18rem'}}>
                                        <Card.Img variant="top" src={addSale}/>
                                        <Card.Body>
                                            {/*<Card.Title><center><Link to={'/CreateLogin'}>Manage Users</Link></center></Card.Title>*/}
                                        </Card.Body>
                                    </Card>
                                </Link>
                                <br/>

                            </Col>
                            <Col>
                                <Link to={"/itemList"}>
                                    <Card style={{width: '18rem', height: '18rem'}}>
                                        <Card.Img variant="top" src={editItem}/>
                                        <Card.Body>
                                            {/*<Card.Title><center><a href="#">View insights</a></center></Card.Title>*/}
                                        </Card.Body>
                                    </Card>
                                </Link>
                                <br/>

                            </Col>
                        </Row>
                    </Container>

                    <br/> <br/>
                </header>
            );
        }
        else {
            return (
                <Redirect to="/AdLog"/>
            );
        }
    }
}
export default connect(
    mapStateToProps
)(ManagerHome);

