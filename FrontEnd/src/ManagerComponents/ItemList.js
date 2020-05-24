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
        <img style={{width:"150px", height:"200px"}} src={props.item.image}/>
        <td>{props.item.name}</td>
        <td>{props.item.category}</td>
        <td>{props.item.description}</td>
        <td>LKR.{props.item.price}</td>
        <td>{props.item.quantity}</td>
        <td>{props.item.size}</td>
        {/*<td>{props.item.sizes}</td>*/}
        <td>{props.item.meterial}</td>
        <td>
            <Link to={"/editItem/"+props.item.id}><Button style={{marginTop: "-5%", marginLeft:"5%",marginBottom:"5%"}} type="button" className="btn btn-success">Edit</Button></Link><br/>
            <button style={{marginTop: "5%"}} type="button" className="btn btn-danger" onClick={() => {props.deleteItem(props.item.id)}}>Delete</button>
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

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount() {

        this.getItems();
    }

    getItems =() =>{
        var allItems =[];
        axios.get('/additem/')
            .then(response => {

                var items = response.data;

                console.log(items.length);
                for(var x = 0; x < items.length ; x++){
                    var base64Flag = 'data:image/jpeg;base64,';
                    var imageStr = this.arrayBufferToBase64(items[x].img.data.data);
                    const item = {
                        id:items[x]._id,
                        image: base64Flag+imageStr,
                        name: items[x].name,
                        category:items[x].category,
                        description:items[x].description,
                        price: items[x].price,
                        quantity:items[x].quantity,
                        size:items[x].size,
                        meterial:items[x].meterial,
                        comment:items[x].comment,
                        rating:items[x].name,
                        discount:items[x].discount,
                    }


                    allItems.push(item)
                    console.log(item);
                }




                this.setState({
                    itemlist: allItems
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

        this.getItems();
    }

    itemList(){
        return this.state.itemlist.map(currentitem =>{
            return <Item item={currentitem} deleteItem={this.deleteItem} key = {currentitem._id} />;
        })
    }

    render() {

        console.log(this.state.itemlist);
        if (this.props.session.username !== null) {

            return (
                <div style={{minHeight:'100vh'}}>
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

