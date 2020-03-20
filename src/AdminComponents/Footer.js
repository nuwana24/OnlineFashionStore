import React from "react";
import {Container} from "@material-ui/core";
// import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import Contain from 'react-bootstrap/Container'
import {Col, Row} from "react-bootstrap";
import color from "@material-ui/core/colors/blueGrey";

const FooterPage = () => {
    return (
        <div className="Footer" className="p-3 mb-2 bg-dark text-white" >
           <footer>
               <Row >
                   <Col></Col>
                   <Col>
                      Address <br />
                      186/4,<br />
                      T.B. Jaya Mawatha,<br />
                      Colombo 05.
                   </Col>
                   <Col>
                   Customer Service <br />
                   Contact Us <br />
                   Delivery <br/>
                   Size Guide
                   </Col>
                   <Col>
                    Discover <br />
                    The Company <br />
                       Promotions <br />
                   </Col>
                   <Col>
                        Follow us on <br />

                   </Col>
               </Row>
           </footer>
        </div>
    );
}

export default FooterPage;