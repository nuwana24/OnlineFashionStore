import React, { Component } from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import ReactDOM from "react-dom";
import {Input} from "@material-ui/core";
import logo from '../Images/plusLogo.png'
import NavBar from "./NavBar";
import background from "../Images/AdminBackgroud.jpg";
import axios from 'axios';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
var sectionstyle ={
    backgroundImage: `url(${background})`
}

const mapStateToProps = ({session}) => ({
    session
})

class AddCategories extends Component {
    constructor(props) {
        super(props);

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.handleAddSubCategory = this.handleAddSubCategory.bind(this);
        this.handleRemoveSubCategory = this.handleRemoveSubCategory.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            CategoryDetails: [],
            category: '',
            subCategories: [{ name: "" }],
            description : '',
            categoryValidation:''
        }
    }

    handleSubCategoryNameChange = idx => evt => {
        const newSubCategories = this.state.subCategories.map((subcategory, sidx) => {
            if (idx !== sidx)
                return subcategory;
            return { ...subcategory, name: evt.target.value };
        });

        this.setState({ subCategories: newSubCategories });


    };

    handleAddSubCategory = () => {
        this.setState({
            subCategories: this.state.subCategories.concat([{name: "" }])
        });
    };

    handleRemoveSubCategory = idx => () => {
        this.setState({
            subCategories: this.state.subCategories.filter((s, sidx) => idx !== sidx)
        });
    };

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        })
    }

    onChangeSubCategory(e){
        this.setState({
            subCategories: e.target.value
        })
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }
    componentDidMount() {
        axios.get('/category/')
            .then(res => {
                this.setState({
                    CategoryDetails: res.data,
                })
            });
    }

    handleValidation(){
        let valid = true;
        if(this.state.category !== '') {
            this.state.CategoryDetails.map(category => {
                if (category.category === this.state.category) {
                    valid = false;
                    this.setState({
                        categoryValidation: "This Category already exists",

                    })

                }
            })
        }
        return valid;
    }
    onSubmit(e) {
        e.preventDefault();

            const categories = {
                category: this.state.category,
                subCategories: this.state.subCategories,
                description: this.state.description
            }

            // console.log(categories.subCategories);
        if(this.handleValidation()) {
            console.log(categories);
            // alert(`${category} added with ${subCategories.length} Sub Categories`);

            axios.post('/category/add', categories)
                .then(res => console.log(res.data));

            this.setState({
                category: '',
                description: '',
                categoryValidation:'',
                subCategories: [{ name: "" }]

            })
            alert('Category added');
            // window.location = '/ViewCategory';
        }
        else{
            alert('Category not added!');
        }

    }

    render() {
        if (this.props.session.username !== null) {
        return (
            <div id="page-container">
            <div style={sectionstyle}>

                <NavBar />
                <section style={sectionstyle}>
                <Container>
                    {/*<Row xs={1} md={2}>*/}
                        <Col className="bg-light " style={{minHeight: '40rem',minWidth:'40px'}}>
                            <Card  style={{minWidth:'40px',minHeight:'42rem',marginTop:'3.5rem'}}>

                    <center><h3 style={{marginTop:'5rem'}}>Add New Category</h3></center>
                <form onSubmit={this.onSubmit} className=' center'>

                    <div className="form-group ml-5 mr-5">
                        <label>Category </label>
                        <input  type="text"
                                required
                                className="form-control "
                                value={this.state.category}
                                onChange={this.onChangeCategory}
                        />
                        <p className='text-danger small'>{this.state.categoryValidation}</p>
                        </div>
                    <div className="form-group ml-5 mr-5">

                        <p>Sub categories {" "}


                        <button
                            type="button"
                            onClick={this.handleAddSubCategory}
                            className="btn btn-info btn-sm "
                        >
                            +
                        </button>
                        </p>
                    {this.state.subCategories.map((subcategory, idx) => (

                        <div className="subcategory">
                            <input
                                type="text"
                                placeholder={`Sub Category #${idx + 1} `}
                                value={subcategory.name}
                                onChange={this.handleSubCategoryNameChange(idx)}
                            />

                            <button
                                type="button"
                                onClick={this.handleRemoveSubCategory(idx)}
                                className="btn btn-success btn-sm"
                            >
                                -
                            </button>

                        </div>
                    ))}


                        <div className="description">
                            <br />
                            <label>Description  </label>
                            <input  type="text"
                                    required
                                    className="form-control"
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <center>
                        <input type="submit" value="Add Category" className="btn btn-info " />
                        </center>
                    </div>
                </form>
                        </Card>

                        </Col>
                    {/*</Row>*/}
                </Container>
            </section>
            </div>

            </div>

        )
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
)(AddCategories);
// const rootElement = document.getElementById("root");
// ReactDOM.render(<AddCategories/>, rootElement);