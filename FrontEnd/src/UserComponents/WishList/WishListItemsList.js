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
        WishList : [],
        images:[],
        loading:true,
    };

    componentDidMount() {
        if(this.props.session.userId !== null){
            this.getImages();
        }
    }
    getImages(){
        var ItemImages =[];
        Axios.get('/additem/')
            .then(response => {
                var items = response.data;
                for(var x = 0; x < items.length ; x++){
                    var base64Flag = 'data:image/jpeg;base64,';
                    var imageStr = this.arrayBufferToBase64(items[x].img.data.data);
                    const item = {
                        image: base64Flag+imageStr,
                        id:items[x]._id,
                    }
                    ItemImages.push(item);

                }
                this.setState({
                    images:ItemImages,
                    loading:false,
                })
            })
            .catch((error) => {
                console.log(error);
            }).finally(() =>
            {
                this.getWishList();
            }

        )

    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    getWishList = () =>{
        Axios.get('/api/WishList/getWishList', {params:{userId: this.props.session.userId}})
            .then(res => {
                const list = res.data;

                let tempList = [];
                let image='';
                if(this.state.loading !== true){
                    list.forEach(item => {
                        this.state.images.map(prod =>{
                            if(prod.id === item.id){
                                image = prod.image
                            }
                        })
                        const singleItem = {image,...item};
                        tempList = [...tempList, singleItem];
                    });

                    this.setState({
                        WishList : tempList
                    })
                }})
    }

    removeWishList = (productId) => {
        Axios.get('/api/WishList/rmoveWishList', {params:{userId: this.props.session.userId, productId: productId}})
            .then(res => {

                this.getWishList();
            })
    };

    addToCart = (item) => {
        console.log('WishListItemList add to cart');
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