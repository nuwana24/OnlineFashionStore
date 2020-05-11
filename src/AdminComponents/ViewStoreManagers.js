import React,{Component} from "react";
import NavBar from "./NavBar";

export default class ViewManager extends Component{
    render() {
        return (
            <div>
                <NavBar />
                <p>You are on the View Manager component </p>
            </div>
        );
    }
}