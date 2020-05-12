import React,{Component} from "react";
import NavBar from "./NavBar";
import {Link} from 'react-router-dom';
import {Button, Container, Card, CardDeck} from "react-bootstrap";
import axios from 'axios';
import {connect} from "react-redux";
import NavBar2 from "./Navbar2";
// import {Card} from "material-ui";

const mapStateToProps = ({ session}) => ({
    session
});

const Item = ({session, ...props}) => (

    <Card style={{width: '18rem', flex: 2, display: "inline-block"}} className="mr-5 mt-5">
        <Card.Img variant='top' src={(`/uploads/${props.item.img}`)} style={{width: "18rem", height: "20rem"}}/>
        <Card.Body>
            <Card.Title style={{fontSize: "20px", fontFamily: "Open-Sans"}}>{props.item.name}</Card.Title>
            {props.item.discount == 0 ?
                <Card.Text>
                    <br />
                <span><b><center> Rs. {props.item.price}.00</center></b> </span>
                </Card.Text>
                :
                <Card.Text>
                    <span style={{textDecoration:"line-through"}}><b><center> Rs. {props.item.price}.00</center></b> </span>
                    <span style={{color:"red"}}><b><center> Rs. {props.item.price - props.item.discount }.00</center></b> </span>
                </Card.Text>
            }

            <button className="cart-btn"  onClick={() => props.addToCart}>
                <i className="fas fa-cart-plus"/>
            </button>
            <button style={{position: "absolute", right: 20}}>
                <i className="fa fa-heart" aria-hidden="true" style={{color: "Red"}}></i>
            </button>
        </Card.Body>
    </Card>

)


class DisplayProducts extends Component {
    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);


        this.state = {
            itemlist: [],
            currentIndex: 0

        }

    }
    componentDidMount() {
        axios.get('http://localhost:5000/additem/')
            .then(response => {
                this.setState({
                    itemlist: response.data
                })
            })

            .catch((error) => {
                console.log(error);
            })

    }

    addToCart = (item) => {
        axios.post('http://localhost:5000/api/cart/addToCart', item);

        console.log('sent')
    };


    itemList(){
        return this.state.itemlist.map(currentitem =>{
            return <Item item={currentitem} deleteItem={this.deleteItem} key = {currentitem._id} addToCart ={this.addToCart}/>;
        })
    }

    GetId(id){
        this.setState({
            currentIndex: id
        })
    }

    render() {
        return (

            <div>
                {/*<NavBar />*/}
                <NavBar2 onClickChanger={this.GetId}/>
                <Container>
                    <div style={{flexDirection: 'row'}} >
                            {this.itemList()}
                    </div>




                </Container>
            </div>

        );
    }
}
export default connect(
    mapStateToProps
)(DisplayProducts);