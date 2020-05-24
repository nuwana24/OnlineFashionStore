import React, { Component } from 'react';
import {Button, Container} from "react-bootstrap";
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

const mapStateToProps = ({ session}) => ({
    session
});
 class EditCategories extends Component {
    constructor(props) {
        super(props);

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.handleAddSubCategory = this.handleAddSubCategory.bind(this);
        this.handleRemoveSubCategory = this.handleRemoveSubCategory.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            category: '',
            subCategories: [{ name: "" }],
            description : '',
            categories:[],
        }
    }

    componentDidMount() {
        axios.get('/category/' +this.props.match.params.id)
            .then(response => {
                this.setState({
                    category:response.data.category,
                    subCategories: response.data.subCategories,
                    description:response.data.description,

                })

            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('/category/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        categories: response.data.map(categorys => categorys.category)
                    })
                }
            })
    }

    handleSubCategoryNameChange = idx => evt => {
        const newSubCategories = this.state.subCategories.map((subcategory, sidx) => {
            if (idx !== sidx) return subcategory;
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
    onSubmit(e) {
        e.preventDefault();

        const categories = {
            category: this.state.category,
            subCategories: this.state.subCategories,
            description: this.state.description
        }

        // console.log(categories.subCategories);

        console.log(categories);
        // alert(`${category} added with ${subCategories.length} Sub Categories`);

        axios.post('/category/update/'+this.props.match.params.id, categories)
            .then(res => console.log(res.data));

        this.setState({
            category: '',
            subCategories: [{ name: "" }],
            description:''
        })

        // window.location = '/ViewCategory';
        alert('Category updated...');
        this.props.history.push('/ViewCategory');
    }

    render() {
        if (this.props.session.username !== null) {
        return (

            <div id="page-container">

                <NavBar />
                <section style={sectionstyle}>
                    <Container>
                        <div className="p-3 mb-2 bg-light text-dark">
                            <center><h3>Edit Category</h3></center>
                            <form onSubmit={this.onSubmit}>

                                <div className="form-group">
                                    <label>Category </label>
                                    <input  type="text"
                                            required
                                            className="form-control"
                                            value={this.state.category}
                                            onChange={this.onChangeCategory}
                                    />
                                </div>
                                <div>

                                    <p>Sub categories {" "}


                                        <button
                                            type="button"
                                            onClick={this.handleAddSubCategory}
                                            className="btn btn-info btn-sm"
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
                                    <input type="submit" value="Update Category" className="btn btn-info" />
                                </div>
                            </form>
                        </div>
                    </Container>
                </section>
            </div>

        )
    } else {
     return (
        <Redirect to="/AdLog"/>
 );
 }}
}
export default connect(
    mapStateToProps
)(EditCategories);
// const rootElement = document.getElementById("root");
// ReactDOM.render(<AddCategories/>, rootElement);