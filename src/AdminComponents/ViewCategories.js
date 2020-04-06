import React,{Component} from "react";
import NavBar from "./NavBar";
import {Link} from 'react-router-dom';
import {Button, Container} from "react-bootstrap";
import axios from 'axios';


const Category = props => (

    <tr>
        <td>{props.category.category}</td>
        <td>{props.category.subCategories.name}</td>
        <td>{props.category.description}</td>

        <td>
            <Link to={"/EditCategory/"+props.category._id}>Edit</Link> <a href="#" onClick={() => {props.RemoveCategory(props.category._id)}}>Delete</a>
        </td>
    </tr>
)


export default class ViewCategory extends Component{
    constructor(props) {
        super(props);

        this.RemoveCategory = this.RemoveCategory.bind(this);

        this.state = {
            categories : [],
        };

    }

    componentDidMount() {
        axios.get('http://localhost:5000/categories/')
            .then(response => {
                this.setState({
                    categories: response.data
                })

            })
            .catch((error) => {
                console.log(error);
            })
        axios.get('http://localhost:5000/categories/find')
            .then(res => console.log(res.data))

    }

    RemoveCategory(id){
        axios.delete('http://localhost:5000/managers/'+id)
            .then(res => console.log(res.data));

        this.setState({
            categories: this.state.categories.filter(el => el._id != id)
        })
    }

    categoryList(){
        return this.state.categories.map(currentcategory =>{
            return <Category category={currentcategory} RemoveCategory={this.RemoveCategory} key = {currentcategory._id} />;
        })
    }

    render() {
        return (
            <div>
                <NavBar />
                <Container>

                    <h3 className="text-center text-bright">Categories</h3>
                    <table className="table">
                        <thead className="thead-light">
                        <tr>
                            <th>Categories</th>
                            <th>Sub categories</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.categoryList()}
                        </tbody>
                    </table>
                </Container>
            </div>
        );
    }
}