import React, {Component} from "react";

import Navbar2 from "../../UserComponents/Navbar2";
import Cart from "./Cart";

class CartMain extends Component{

    render() {
        return(
            <React.Fragment>
                <Navbar2/>
                <Cart/>
            </React.Fragment>
        );
    }
}

export default CartMain;