import React, {Component} from 'react';

import {Link} from "react-router-dom";

export default function CartTotals({...props}) {

    const {cart } = props;
    var total = 0;
    var discount = 0;

    cart.map(item => {
        total = total + ((Number(item.price) - Number(item.discount)) * Number(item.quantity));
        discount = discount + (Number(item.quantity) * Number(item.discount));
    })

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                        <h5>
                            <span className="text-title">Sub Total: </span>
                            <strong>$ {total}</strong>
                        </h5>
                        <h5>
                            <span className="text-title">Discount: </span>
                            <strong>$ {discount}</strong>
                        </h5>
                        <h5>
                            <span className="text-title">Total: </span>
                            <strong>$ {total - discount}</strong>
                        </h5>

                        <Link to='/'>
                            <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                                <button className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button"
                                        o>Clear Cart</button>
                                <button className="btn btn-outline-info ml-3 text-uppercase mb-3 px-5" type="button"
                                        >Check Out</button>
                            </div>

                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
