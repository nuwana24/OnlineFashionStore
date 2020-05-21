import React, {Component} from 'react';
import WishListItem from "./WishListItem";
import Titles from "../Titles";
import EmptyWishList from "./EmptyWishList";
import {connect} from "react-redux";
import Axios from "axios";
import {Redirect} from "react-router-dom";

const mapStateToProps = ({ session}) => ({
    session
});

class WishListItemsList extends Component{

    constructor() {
        super();
        this.removeWishList = this.removeWishList.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    state = {
        WishList : []
    };

    componentDidMount() {
        if(this.props.session.userId !== null){

            Axios.get('/api/WishList/getWishList', {params:{userId: this.props.session.userId}})
                .then(res => {
                    const list = res.data;

                    let tempList = [];
                    list.forEach(item => {
                        const singleItem = {...item};
                        tempList = [...tempList, singleItem];
                    });

                    this.setState({
                        WishList : tempList
                    })
                })
        }
    }

    removeWishList = (productId) => {
        Axios.get('/api/WishList/rmoveWishList', {params:{userId: this.props.session.userId, productId: productId}})
            .then(res => {
                const list = res.data;

                let tempList = [];
                list.forEach(item => {
                    const singleItem = {...item};
                    tempList = [...tempList, singleItem];
                });

                this.setState({
                    WishList : tempList
                })
            })
    };

    addToCart = (item) => {
        Axios.post('/api/cart/addToCart', item);
    };



    render() {
        if(this.props.session.userId !== null) {
            return (
                <React.Fragment>
                    <div className="py-4 ">
                        <div className="container">
                            <Titles name="Wish" title="List"/>

                            <div className="row">
                                {(this.state.WishList.length > 0) ? (
                                    this.state.WishList.map(favourite => {
                                        return <WishListItem key={favourite.id} WishListItem={favourite} removeWishList={this.removeWishList} addToCart={this.addToCart}/>;
                                    })
                                ) : (
                                    <EmptyWishList/>
                                )}

                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }
}

export default connect(mapStateToProps)(WishListItemsList);