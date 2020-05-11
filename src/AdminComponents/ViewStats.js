import React,{Component} from "react";
import NavBar from "./NavBar";

export default class ViewStats extends Component{
    render() {
        return (
            <div>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>

                <NavBar />
                <div>
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        );
    }
}