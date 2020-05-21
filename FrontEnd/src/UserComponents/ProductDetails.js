import React, {Component} from 'react';
import {ReviewButtonContainer} from "./Buttons";
import StarRatingComponent from './StarRatingComponent';
import NavBar from "./NavBar";
import LoginNav from "../AdminComponents/LoginNav";
import {connect} from "react-redux";
import Axios from "axios";

const mapStateToProps = ({ session}) => ({
    session
});

class ProductDetails extends Component {

    constructor(props){
        super(props);

        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onStarClick = this.onStarClick.bind(this);

        this.state = {
            comments: [],
            items:[],
            commentNew:'',
            ratings:[]
        }
    }

    onChangeContent(e){

        this.setState({
            commentNew : e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const {_id} = this.props.location.item;
        this.state.items.map(item =>{
            if(item._id == _id){
                this.setState({
                    comments:item.comment
                })
            }
        })
        this.setState({
            comments:this.state.comments.push(this.state.commentNew)
        })

        alert('Your comment is submitted');
        const comm  = {_id: _id, comment: this.state.commentNew}
        Axios.post('/additem/pushComment/',comm)
            .then(res => console.log(res.data))


        this.setState({
            commentNew:'',
        })
    }

    onStarClick(nextValue) {
        const { rating } = this.state;
        this.setState({rating: nextValue});
        console.log(rating);
        const {_id} = this.props.location.item;
        alert('Thank You for your rating');

        const rate = {_id: _id, rating:nextValue};
        Axios.post('/additem/pushRates/',rate)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    addToWishList = (item) => {
        Axios.post('/api/WishList/addToWishList', item);

        console.log('Added to wishlist');
    };

    componentDidMount() {
        Axios.get('/additem/')
            .then(response => {
                this.setState({
                   items: response.data
                })
            })

            .catch((error) => {
                console.log(error);
            })
        console.log(this.state.items.comment)

    }

    render() {
        const { rating } = this.state;
        const {_id, name, img, price, description, meterial} = this.props.location.item;

        const comments = [];
        const ratings = [];
        var totRate = 0;
        var R = 0;
        {this.state.items.map(item => {
            if(item._id == _id) {
                var x = item.comment.length;
                for (var i = 0; i < x; i++) {
                    comments.push(item.comment[i]);
                }
                R = item.rating.length;
                for (var y = 0; y < R;y++) {
                    ratings.push(item.rating[y]);
                    totRate = totRate+ item.rating[y];
                }
            }
        })}

        console.log(totRate,R);
        var averageRate = 0;

        if(R>0)
            averageRate = totRate/R;


        return (
            <div>
                <LoginNav />
                <div className="container py-5">

                    <div className="row">
                        <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                            <h1>{name}</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-10 mx-auto col-md-6 my-3">
                            <img src ={(`/uploads/${img}`)} className="img-fluid" alt="product"/>

                                </div>
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2>Item : {name}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                        Material : <span className="text-uppercase "> {meterial} </span>
                                    </h4>
                                    <h4 className="text-blue">
                                        <strong>
                                            Price : <span>Rs:</span> {price}/=
                                        </strong>
                                    </h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                        About Product
                                    </p>
                                    <p className="text-muted lead">
                                        {description}
                                    </p>
                                    <div>
                                        <p>Current Ratings: <span style={{color:"red"}} >{averageRate}</span></p>
                                        <h5>Ratings: {rating}</h5>
                                        <StarRatingComponent
                                            name="rate1"
                                            starCount={5}
                                            value={rating}
                                            onStarClick={this.onStarClick}
                                        />
                                    </div>
                                    <div>
                                        <h5>Add a Comment</h5>
                                        <form onSubmit={this.onSubmit} >
                                            <div className="form-group">
                                                <textarea rows="5"
                                                          required
                                                          className="form-control"
                                                          value={this.state.comment}
                                                          placeholder="Type a comment"
                                                          onChange={this.onChangeContent}>
                                                </textarea>
                                            </div>
                                            <div className="form-group" align="right">
                                                <input type="submit"
                                                       className="btn btn-dark"
                                                       value="Post Comment">
                                                </input>
                                            </div>
                                        </form>
                                        <form>

                                            <div className="border col-auto mx-auto col-auto mx-auto mt-auto  bg-transparent">
                                                <h3 className='comment text-center' style={{color: "red"}}>Reviews.....</h3>
                                                <div className='mx-4 mb-4'>
                                                    {comments.map(cmt =>{
                                                        return <li>{cmt}</li>
                                                    })}
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    );
    }
}

export default connect (mapStateToProps)(ProductDetails) ;
