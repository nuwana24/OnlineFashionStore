import React,{Component} from "react";
import NavBar from "./NavBar";
import {Link, Redirect} from 'react-router-dom';
import {Button, Container} from "react-bootstrap";
import axios from 'axios';
import editItem from "./editItem";
import {connect} from "react-redux";




const mapStateToProps = ({session}) => ({
    session
})

const Item = props => (

    <tr>
        {/*<div className="image-container" ><img src={/uploads/}{...props.item.img} alt="icon" width="300" height="400" /> </div>*/}
        {/*<td>{props.item.img}</td>*/}
        {/*<img src= {"/uploads/"}{...props.item.img} width="150" height="200"/>*/}
        <img style={{width:"150px", height:"200px"}} src={(`/uploads/${props.item.img}`) }/>
        <td>{props.item.name}</td>
        <td>{props.item.category}</td>
        <td>{props.item.description}</td>
        <td>LKR.{props.item.price}</td>
        <td>{props.item.quantity}</td>
        <td>{props.item.size}</td>
        {/*<td>{props.item.sizes}</td>*/}
        <td>{props.item.meterial}</td>
        <td>
            <Link to={"/editItem/"+props.item._id}><Button style={{marginTop: "-5%", marginLeft:"5%",marginBottom:"5%"}} type="button" className="btn btn-success">Edit</Button></Link>
            <button style={{marginTop: "5%"}} type="button" className="btn btn-danger" onClick={() => {props.deleteItem(props.item._id)}}>Delete</button>
        </td>
    </tr>
)

class ItemList extends Component {
    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this);

        this.state = {
            itemlist: []

        }

    }
    componentDidMount() {
        axios.get('/additem/')
            .then(response => {
                this.setState({
                    itemlist: response.data
                })
            })

            .catch((error) => {
                console.log(error);
            })

    }
    deleteItem(id){
        axios.delete('/additem/'+id)
            .then(res => console.log(res.data));

        this.setState({
            itemlist: this.state.itemlist.filter(el => el._id != id)
        })
    }

    itemList(){
        return this.state.itemlist.map(currentitem =>{
            return <Item item={currentitem} deleteItem={this.deleteItem} key = {currentitem._id} />;
        })
    }

    render() {
        if (this.props.session.username !== null) {

            return (
                <div>
                    <NavBar/>
                    <Container>

                        <h3 style={{marginTop: "3%", marginBottom: "2%"}} className="text-center text-bright">Item
                            List</h3>
                        <table className="table">
                            <thead style={{marginBottom: "3%"}} className="thead-dark">
                            <tr>
                                <th>Image</th>
                                {/*<th>URL</th>*/}
                                <th>Name</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Size</th>
                                <th>Meterial</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.itemList()}
                            </tbody>
                        </table>
                    </Container>
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
)(ItemList);

