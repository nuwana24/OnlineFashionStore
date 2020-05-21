import React,{Component} from "react";
import NavBar from "./NavBar";
import {Link, Redirect} from 'react-router-dom';
import {Button, Container, Spinner, Table} from "react-bootstrap";
import axios from 'axios';
import {connect} from "react-redux";


const mapStateToProps = ({ session}) => ({
    session
});

const Category = props => (

    <tr>
        <td>{props.category.category}</td>

        <td>{props.category.description}</td>

        <td>
            <Link to={"/EditCategory/"+props.category._id}>Edit</Link> <a href="#" onClick={() => {props.RemoveCategory(props.category._id)}}>Delete</a>
        </td>
    </tr>
)


 class ViewCategory extends Component {
     constructor(props) {
         super(props);

         this.RemoveCategory = this.RemoveCategory.bind(this);

         this.state = {
             categories: [],
             loading: true,
         };

     }

     componentDidMount() {
         axios.get('/category/')
             .then(response => {
                 this.setState({
                     categories: response.data,
                     loading:false
                 })
                 console.log(response.data);

             })
             .catch((error) => {
                 console.log(error);
             })
         // axios.get('http://localhost:5000/category/find')
         //     .then(res => console.log(res.data))

     }

     RemoveCategory(id) {
         axios.delete('/category/' + id)
             .then(res => console.log(res.data));

         this.setState({
             categories: this.state.categories.filter(el => el._id != id)
         })
     }

     categoryList() {
         return this.state.categories.map(currentcategory => {
             return <Category category={currentcategory} RemoveCategory={this.RemoveCategory}
                              key={currentcategory._id}/>;
         })
     }

     render() {
         if (this.props.session.username !== null) {
             return (
                 <div id="page-container">
                     <NavBar/>

                         <Container>

                             <h3 className="text-center text-bright">Categories</h3>
                             <Table responsive>
                                 <thead className="thead-light">
                                 {this.state.loading ? <center><Spinner animation="border" /></center> :
                                     <tr>
                                         <th>Categories</th>
                                         <th>Description</th>
                                         <th>Action</th>
                                     </tr>
                                 }
                                 </thead>
                                 <tbody>
                                 {this.categoryList()}
                                 </tbody>
                             </Table>
                         </Container>



                 </div>
             );
         } else {
             return (
                 <Redirect to="/AdLog"/>
             );
         }
     }
 }
export default connect(
    mapStateToProps
)(ViewCategory);