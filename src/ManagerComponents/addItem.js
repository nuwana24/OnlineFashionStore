import React, { Component } from 'react';
import {Button, Container} from "react-bootstrap";
import ReactDOM from "react-dom";
import {Input} from "@material-ui/core";
import NavBar from "./NavBar";
import background from "../Images/AdminBackgroud.jpg";
// import axios from 'axios';
var sectionstyle ={
    backgroundImage: `url(${background})`
}

export default class addItem extends Component {
    constructor(props) {
        super(props);

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
        this.onChangeMeterial = this.onChangeMeterial.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            category : '',
            description : '',
            name : '',
            price : '',
            quantity : '',
            size : '',
            meterial : ''

        }
    }

    // handleSubCategoryNameChange = idx => evt => {
    //     const newSubCategories = this.state.subCategories.map((subcategory, sidx) => {
    //         if (idx !== sidx) return subcategory;
    //         return { ...subcategory, name: evt.target.value };
    //     });
    //
    //     this.setState({ subCategories: newSubCategories });
    // };
    //
    // handleAddSubCategory = () => {
    //     this.setState({
    //         subCategories: this.state.subCategories.concat([{category: "" }])
    //     });
    // };
    //
    // handleRemoveSubCategory = idx => () => {
    //     this.setState({
    //         subCategories: this.state.subCategories.filter((s, sidx) => idx !== sidx)
    //     });
    // };
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

    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }

    onChangePrice(e){
        this.setState({
            price: e.target.value
        })
    }

    onChangeQuantity(e){
        this.setState({
            quantity: e.target.value
        })
    }

    onChangeSize(e){
        this.setState({
            size: e.target.value
        })
    }

    onChangeMeterial(e){
        this.setState({
            meterial: e.target.value
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
            description: this.state.description,
            name : this.state.name,
            price : this.state.price,
            quantity : this.state.quantity,
            size : this.state.size,
            meterial : this.state.meterial
        }

        const { category } = this.state;
        console.log(user);
        alert('Item ${category} added ');

        // axios.post('http://localhost:5000/users/add', user)
        //     .then(res => console.log(res.data));

        this.setState({
            category: '',
            description:'',
            name : '',
            price : '',
            quantity : '',
            size : '',
            meterial : ''
        })

    }

    render() {
        return (

            <div>

                <NavBar />
                <section style={sectionstyle}>
                    <Container>
                        <div className="p-3 mb-2 bg-light text-dark">
                            <center><h3>Add Item</h3></center>
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

                                <div className="form-group">
                                    <label>Name </label>
                                    <input  type="text"
                                            required
                                            className="form-control"
                                            value={this.state.name}
                                            onChange={this.onChangeName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Price </label>
                                    <input  type="text"
                                            required
                                            className="form-control"
                                            value={this.state.price}
                                            onChange={this.onChangePrice}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Quantity </label>
                                    <input  type="text"
                                            required
                                            className="form-control"
                                            value={this.state.quantity}
                                            onChange={this.onChangeQuantity}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Size </label>
                                    <input  type="text"
                                            required
                                            className="form-control"
                                            value={this.state.size}
                                            onChange={this.onChangeSize}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Meterial </label>
                                    <input  type="text"
                                            required
                                            className="form-control"
                                            value={this.state.meterial}
                                            onChange={this.onChangeMeterial}
                                    />
                                </div>


                                <br />
                                <div className="form-group">
                                    <input type="submit" value="Add Item" className="btn btn-info" />
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