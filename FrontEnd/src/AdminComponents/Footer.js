import React from "react";
import {Container} from "@material-ui/core";
// import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import Contain from 'react-bootstrap/Container'
import {Col, Row} from "react-bootstrap";
import color from "@material-ui/core/colors/blueGrey";

const FooterPage = () => {
    return (
        <div style={{Bottom:'0'}}>
           <footer>
               <div  className="Footer" className="p-3 mb-2 bg-dark text-white">
               <Row >

                   <Col>
                      <b>Address </b><br />
                      186/4,<br />
                      T.B. Jaya Mawatha,<br />
                      Colombo 05.
                       <br/>
                   </Col>
                   <Col>
                       <b>Contact Us </b><br />
                   (+94)112233443 <br/>
                   (+94)113333443 <br/>
                   (+94)773322112
                       <br/>
                   </Col>
                   <Col>
                       <b>Discover </b><br />
                       <b>The Company </b><br />
                       <b>Promotions</b> <br />
                       <b>Customer Services</b>
                       <br/>
                   </Col>
                   <Col>
                       <b>Follow us on </b><br />
                       &nbsp; <i className="fab fa-instagram"></i> &nbsp;
                       <i className="fab fa-facebook-square "></i> &nbsp;
                       <i className="fab fa-twitter"></i>
                       <br/><br />

                       <a href='/AdLog' style={{color:'white'}}>Admin & Manager login</a>

                   </Col>

               </Row>
               </div>
           </footer>
        </div>
    );
}

export default FooterPage;
