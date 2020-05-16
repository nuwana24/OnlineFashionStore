import React, {Component} from "react";

import WishListItemsList from "./WishListItemsList";
import NavBar from "../NavBar";

class WishListMain extends Component{

    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <WishListItemsList />
            </React.Fragment>
        );
    }
}

export default WishListMain;