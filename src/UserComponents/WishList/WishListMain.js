import React, {Component} from "react";

import {Switch, Route} from 'react-router-dom';

import WishListHome from "./WishListHome";
import WishListItemsList from "./WishListItemsList";

class WishListMain extends Component{

    render() {
        return (
            <React.Fragment>
                <WishListItemsList />
                <Switch>
                    <Route path="/WishListHome" component={WishListHome}/>
                </Switch>
            </React.Fragment>
        );
    }
}

export default WishListMain;