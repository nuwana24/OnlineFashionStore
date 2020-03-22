import React, {Component} from 'react';

import {ProductConsumer} from "../../context";
import WishListItem from "./WishListItem";
import Titles from "../../UserComponents/Titles";
import EmptyWishList from "./EmptyWishList";

class WishListItemsList extends Component {


    render() {
        return (
            <React.Fragment>
                <div className = "py-4 ">
                    <div className = "container">
                        <i className=" fas fa-heart">
                            <Titles name = "WishList" title = ""/>
                        </i>
                        <div className="row">
                            <ProductConsumer>
                                {list => {
                                    return list.WishList.map( favourite =>{
                                        return <WishListItem key={favourite.id} WishListItem={favourite} />;
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default WishListItemsList;