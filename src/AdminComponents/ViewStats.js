import React, { Component } from 'react'
import axios from 'axios';

import { Bar } from 'react-chartjs-2';

export class ViewStats extends Component {
    constructor(props) {

        super(props);

        this.state = { Data: {} };

    }

    componentDidMount() {
        axios.get(`http://localhost:5000/additem/`)

            .then(res => {

                console.log(res);

                const productStat = res.data;

                let item = [];

                let category = [];

                productStat.forEach(product => {

                    item.push({category:product.category, price:product.price});
                    if (category.indexOf(product.category) === -1) {
                        category.push({name:product.category});
                    }
                    // category.push(product.category);

                });
                // productStat.forEach(prod =>{
                //     category.map(cat =>{
                //         if(prod.category == cat.name)
                //             category.push({price: price +prod.price})
                //
                //     })
                // })

                const price = item[0].price;
                console.log(item[0].price);


              for(var i= 0 ; i < item.length;i++){
                  category[i].total = 0;
                  if(item[i].category == category[i].name){
                        category[i].total = item[i].price + category[i].total;
                  }
              }
                console.log(category[0].name,category[0].total);
                this.setState({

                    Data: {

                        labels: category,
                        datasets: [
                            {
                                label: 'Price for each category',
                                data: price,
                                backgroundColor: [
                                    "#3cb371",
                                    "#0000FF",
                                    "#9966FF",
                                    "#4C4CFF",
                                    "#00FFFF",
                                    "#f990a7",
                                    "#aad2ed",
                                    "#FF00FF",

                                    "Blue",

                                    "Red"
                                ]

                            }

                        ]

                    }

                });

            })

    }

    render() {

        return (

            <div>

            <Bar data={this.state.Data}

        options={{ maintainAspectRatio: false }} ></Bar>

        </div>

    )

    }

}

export default ViewStats;