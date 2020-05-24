import React,{Component} from "react";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import NavBar from "./NavBar";
import {Alert, Card, CardBody, CardSubtitle, CardTitle, FormGroup, Input, Label, Spinner} from "reactstrap";
import {Link, Redirect} from "react-router-dom";
import {toNumber} from "reactstrap/es/utils";
import axios from "axios";
import {connect} from "react-redux";


const mapStateToProps = ({session}) => ({
    session
})


class discountPopUp extends Component{
    constructor(props) {
        super(props);
        // this.handleFileChange = this.handleFileChange.bind(this);
        // this.onChangeCategory = this.onChangeCategory.bind(this);
        // this.onChangeName = this.onChangeName.bind(this);
        // this.onChangeDescription = this.onChangeDescription.bind(this);
        // this.onChangePrice = this.onChangePrice.bind(this);
        // this.onChangeQuantity = this.onChangeQuantity.bind(this);
        // this.onChangeSize = this.onChangeSize.bind(this);
        // this.onChangeMeterial = this.onChangeMeterial.bind(this);
        this.onChangeDiscount = this.onChangeDiscount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            file: '',
            category : '',
            description : '',
            name : '',
            price : '',
            quantity : '',
            size :'',
            sizes : ['Small','Medium','Large'],
            meterial : '',
            discount:'',
            itemlist: []

        }
    }
    onChangeDiscount(e) {
        this.setState({
            discount: e.target.value
        })
    }
    componentDidMount() {
        axios.get('/additem/' +this.props.match.params.id)
            .then(response => {
                this.setState({
                    category:response.data.category,
                    description:response.data.description,
                    name : response.data.name,
                    price:response.data.price,
                    quantity :response.data.quantity,
                    size : response.data.size,
                    meterial : response.data.meterial,
                    discount : response.data.discount,

                })

            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get('/additem/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        itemlist: response.data.map(additem => additem.name)
                    })
                }
            })
    }
    onSubmit = (e) => {
        e.preventDefault();

        const item = {
            category: this.state.category,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            quantity: this.state.quantity,
            size: this.state.size,
            meterial: this.state.meterial,
            discount: this.state.discount,

        }


        console.log(item);

        // axios.post('http://localhost:5000/additem/add', additem)
        //     .then(res => console.log(res.data))
        //     .catch(err => console.log(err))
        axios.post('/additem/update/'+this.props.match.params.id,item)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
             alert('Discount Added')


        this.props.history.push({
            pathname: '/addDiscount',
            details: axios.get('/additem/')
                .then(response => {
                    if(response.data.length > 0){
                        this.setState({
                            itemlist: response.data.map(additem => additem.name)
                        })
                    }
                })
        });

    }
    render() {
        if (this.props.session.username !== null) {

            return (
                <div>
                    <React.Fragment>
                        <NavBar/>
                        <div style={{width: "50%", marginTop: "3%", marginLeft: "25%",minHeight:'70vh'}}>

                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        <h2><strong>
                                            <center>Discount</center>
                                        </strong></h2>
                                    </CardTitle>
                                    <CardSubtitle className="text-muted">
                                        <center>Add Discount Amount LKR.
                                        </center>
                                    </CardSubtitle>
                                    <br/>

                                    <Form onSubmit={this.onSubmit}>
                                        <FormGroup>

                                            {/*<Label for="email">E-mail</Label>*/}
                                            <input type="text"
                                                   required
                                                   className="form-control"
                                                   value={this.state.discount}
                                                   onChange={this.onChangeDiscount}
                                            />
                                            <input style={{marginTop: "3%", marginLeft: "40%"}} type="submit"
                                                   value="Add Discount" className="btn btn-success"/>

                                        </FormGroup>
                                    </Form>
                                </CardBody>
                            </Card>

                        </div>
                    </React.Fragment>
                </div>
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
)(discountPopUp);

