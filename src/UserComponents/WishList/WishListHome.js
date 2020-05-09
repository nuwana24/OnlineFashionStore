import React, {Component} from 'react';
import {ProductConsumer} from "../../context";
import EmptyWishList from "./EmptyWishList";
import NavBar from "../NavBar";
import Axios from "axios";

class WishListHome extends Component {

    render() {
        return (
            <section>
                <ProductConsumer>
                    {value => {
                        const {WishList} = value;

                        if(WishList.length > 0){
                            return(
                                <React.Fragment>
                                    <WishList value = {value}/>
                                </React.Fragment>
                            );
                        } else {
                            return (
                                <EmptyWishList/>
                            );
                        }
                    }}
                </ProductConsumer>
            </section>
        );
    }
}

export default WishListHome;