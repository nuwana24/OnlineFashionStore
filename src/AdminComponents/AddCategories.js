import React, { Component } from 'react';
import {Button, Container} from "react-bootstrap";
import ReactDOM from "react-dom";
import {Input} from "@material-ui/core";
import logo from '../Images/plusLogo.png'
import NavBar from "./NavBar";
// import axios from 'axios';

export default class AddCategories extends Component {
    constructor(props) {
        super(props);

        this.onChangeCategory = this.onChangeCategory.bind(this);
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
            subCategories: this.state.subCategories.concat([{category: "" }])
        });
    };

    handleRemoveSubCategory = idx => () => {
        this.setState({
            subCategories: this.state.subCategories.filter((s, sidx) => idx !== sidx)
        });
    };
    // onChangeSubs(e){
    //     this.setState({
    //         subcats: e.target.value
    //     })
    // }
    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        })
    }

    // onChangeSubCategory(e) {
    //     this.setState({
    //         category: e.target.value
    //     })
    // }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }


    // onAddCategory() {
    //     console.log('clicked');
    //     const name = `ingrediant-${Object.keys(this.state.subcats).length}`;
    //     let inputbox = <Input name={name}
    //                           onChange={this.onChange.bind(this, name)}/>
    //     const inputs = this.state.inputs;
    //     inputs.push( inputbox );
    //     this.setState( { inputs } );
    //
    // }
    onSubmit(e) {
        e.preventDefault();

        const user = {
            category: this.state.category,
            subCategories: this.state.subCategories,
            description: this.state.description
        }

        const { category, subCategories } = this.state;
        console.log(user);
        alert('${category} added with ${subCategories.length} Sub Categories');

        // axios.post('http://localhost:5000/users/add', user)
        //     .then(res => console.log(res.data));

        this.setState({
            category: '',
            description:''
        })

    }

    render() {
        return (

            <div>

                <NavBar />
                <Container>
                <h3>Add New Category</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Category :  </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.category}
                                onChange={this.onChangeCategory}
                        />
                        </div>
                    <div>
                        <p>Sub categories</p>
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
                    <br />
                    <button
                        type="button"
                        onClick={this.handleAddSubCategory}
                        className="btn btn-info btn-sm"
                    >
                        Add Sub Category
                    </button>
                        <br />
                        <div className="subcategory">
                            <br />
                            <label>Description : </label>
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
                        <input type="submit" value="Add Category" className="btn btn-info" />
                    </div>
                </form>
                </Container>
            </div>

        )
    }
}
// const rootElement = document.getElementById("root");
// ReactDOM.render(<AddCategories/>, rootElement);