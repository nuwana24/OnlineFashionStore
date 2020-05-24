import React, { Component } from 'react'
import axios from 'axios';

import { Bar } from 'react-chartjs-2';
import NavBar from "./NavBar";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {Spinner} from "react-bootstrap";

const mapStateToProps = ({ session}) => ({
    session
});

export class ViewStats extends Component {
    constructor(props) {

        super(props);

        this.state = { Data: {}, TotFor:[] ,loading:true};

    }

    componentDidMount() {
        axios.get(`/additem/`)

            .then(res => {

                const productStat = res.data;

                let items = productStat.data;
                let item = [];

                let category = [];

                productStat.forEach(product => {

                    item.push({category:product.category, price:product.price,quantity:product.quantity});
                    if (category.indexOf(product.category) === -1) {
                        category.push(product.category);
                    }

                });

              for(var i= 0 ; i < category.length;i++){
                  for(var j = 0 ; j < item.length; j++){
                      if(category[i] == item[j].category){
                          this.state.TotFor.push({price: (item[j].price * item[j].quantity),category:category[i]});
                      }
                  }
              }

                const CategoryWise = this.state.TotFor.reduce((itemsSoFar, { category, price }) => {
                    if (!itemsSoFar[category]) itemsSoFar[category] = [];
                    itemsSoFar[category].push(price);
                    return itemsSoFar;
                }, {});
              var  W = 0;
                var  T= 0;
                var  K= 0;
                var  SW = 0;
                var  M = 0;

                CategoryWise.Women.map(x =>{
                    W = W + x;
                })
                CategoryWise.Men.map(x =>{
                        M = M+ x;
                    })
                CategoryWise.Toys.map(x =>{
                    T= T+ x;
                })
                CategoryWise.Kids.map(y =>{
                    K = K+ y
                })

                CategoryWise.SwimWear.map(x =>{
                    SW = SW + x
                })

                let tots =[];
                tots.push(W);
                tots.push(SW);
                tots.push(K);
                tots.push(T);
                tots.push(M);

                this.setState({
                    loading:false,
                    Data: {

                        labels: category,
                        datasets: [
                            {
                                label: 'Price for each category',
                                data: tots,
                                backgroundColor: [
                                    "#3cb371",
                                    "#0000FF",
                                    "#9966FF",
                                    "#4C4CFF",
                                    "#00FFFF",

                                ]

                            }

                        ]

                    }

                });

            })

    }

    render() {
        if (this.props.session.username !== null) {
        return (

            <div style={{minHeight:'85vh'}}>
                <NavBar />

                <center><h2>Total value of the prices of each category</h2></center>
                {this.state.loading ? <center><Spinner animation='border' /></center> :
            <Bar data={this.state.Data}
                 options={{
                     responsive: true,
                     maintainAspectRatio: true,
                 }}
        ></Bar> }

        </div>

    )

    }
        else {
            return (
                <Redirect to="/AdLog"/>
            );
        }
    }
}



export default connect(
    mapStateToProps
)(ViewStats);