import React, {Component} from "react";
import NavBar from "../NavBar";
import Cart from "./Cart";

class CartMain extends Component{

    render() {
        return(
            <React.Fragment>
                <NavBar/>
                <Cart/>
            </React.Fragment>
        );
    }
}

export default CartMain;