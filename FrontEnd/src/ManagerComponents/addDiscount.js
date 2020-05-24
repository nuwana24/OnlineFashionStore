import React,{Component} from "react";
import NavBar from "./NavBar";
import {Link, Redirect} from 'react-router-dom';
import {Button, ButtonToolbar, Container} from "react-bootstrap";
import {discountPopUp} from "./discountPopUp";
import axios from 'axios';
import {connect} from "react-redux";


const mapStateToProps = ({session}) => ({
    session
})

const Item = props => (

    <tr>
        {/*<div className="image-container" ><img src={/uploads/}{...props.item.img} alt="icon" width="300" height="400" /> </div>*/}
        {/*<td>{props.item.img}</td>*/}
        {/*<td>{props.item.description}</td>*/}
        <td>{props.item.name}</td>
        <td>{props.item.category}</td>
        <td>LKR.{props.item.price}</td>
        {/*<td>{props.item.quantity}</td>*/}
        <td>LKR.{props.item.discount}</td>

        {/*<td>{props.item.size}</td>*/}
        {/*<td>{props.item.sizes}</td>*/}
        {/*<td>{props.item.meterial}</td>*/}
        <td>
            {/*<button type="button" className="btn btn-success" <Link to={"/EditManager/"+props.manager._id}>Edit</Link>>Edit</button>*/}
            <Link to={"/discountPopUp/"+props.item._id}><Button style={{marginTop: "-5%", marginRight:"5%"}} type="button" className="btn btn-primary">Add</Button></Link>

            {/*<button style={{marginTop: "-5%"}} type="button" className="btn btn-primary" onClick={()=> this.setState({addModalShow:true})}>Add Discount</button>*/}
            {/*<ButtonToolbar>*/}
            {/*    <discountPopUp*/}
            {/*    show = {this.state.addModalShow}*/}
            {/*    onHide = {addModalClose}*/}
            {/*    />*/}
            {/*</ButtonToolbar>*/}
            {/*<Link to={"/editItem/"+props.item._id}>Edit</Link>*/}
            {/*onClick={() => {props.deleteItem(props.item._id)}}*/}
        </td>
    </tr>
)

class ItemList extends Component {
    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this);

        this.state = {
            itemlist: [], addModalShow: false,


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
                    <Container >
                        <div style={{minHeight:'100vh'}}>
                        <h3 style={{marginTop: "3%"}} className="text-center text-bright">Item List</h3>
                        <table className="table" style={{marginLeft: "2%"}}>
                            <thead className="thead-dark">
                            <tr>
                                {/*<th>Image</th>*/}
                                {/*<th>URL</th>*/}
                                <th>Item Name</th>
                                <th>Category</th>
                                {/*<th>Description</th>*/}
                                <th>Price</th>
                                <th>Discount</th>

                                <th></th>
                                {/*<th>Meterial</th>*/}
                            </tr>
                            </thead>
                            <tbody>
                            {this.itemList()}
                            </tbody>
                        </table>
                        </div>
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

