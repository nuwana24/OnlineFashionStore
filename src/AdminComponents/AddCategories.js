import React, { Component } from 'react';
import {Button, Container} from "react-bootstrap";
import ReactDOM from "react-dom";
import {Input} from "@material-ui/core";
import logo from '../Images/plusLogo.png'
import NavBar from "./NavBar";
import background from "../Images/AdminBackgroud.jpg";
import axios from 'axios';
var sectionstyle ={
    backgroundImage: `url(${background})`
}

export default class AddCategories extends Component {
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
            description : ''
        }
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

        axios.post('http://localhost:5000/category/add', categories)
            .then(res => console.log(res.data));

        this.setState({
            category: '',
            description:''
        })

    }

    render() {
        return (

            <div style={sectionstyle}>

                <NavBar />
                <section style={sectionstyle}>
                <Container>

                <div className="p-5 mb-2 mt-3 bg-light text-dark">

                    <center><h3>Add New Category</h3></center>
                <form onSubmit={this.onSubmit} className=' center'>

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
                </div>
                </Container>
            </section>
            </div>

        )
    }
}
// const rootElement = document.getElementById("root");
// ReactDOM.render(<AddCategories/>, rootElement);