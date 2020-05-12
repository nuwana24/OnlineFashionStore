import React, {Component} from 'react';

class EmptyWishList extends Component {
    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-title">
                        <ul>
                            <span className="mr-4">
                                 <i className=" fas fa-heart"></i>
                            </span>
                        </ul>
                        <ul>
                            <h1>You haven't added any items to Wish List yet!!</h1>
                        </ul>

                    </div>
                </div>
            </div>
        );
    }
}

export default EmptyWishList;