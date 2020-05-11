import React, {useEffect, useState} from 'react';

import {ProductConsumer} from "../../context";
import WishListItem from "./WishListItem";
import Titles from "../../UserComponents/Titles";
import EmptyWishList from "./EmptyWishList";
import {connect} from "react-redux";
import Axios from "axios";
import {Redirect} from "react-router-dom";

const mapStateToProps = ({ session}) => ({
    session
});

const WishListItemsList = ({session}) => {

    const [WishList, setWishList] = useState([]);

    useEffect(() => {
        if(session.userId !== null){

            Axios.get('http://localhost:5000/api/WishList/getWishList', {params:{userId: session.userId}})
                .then(res => {
                    const list = res.data;

                    let tempList = [];
                    list.forEach(item => {
                        const singleItem = {...item};
                        tempList = [...tempList, singleItem];
                    });

                    setWishList(tempList);
                })
        }

    }, []);

    const removeWishList = (productId) => {
        Axios.get('http://localhost:5000/api/WishList/rmoveWishList', {params:{userId: session.userId, productId: productId}})
    }

    if(session.userId !== null) {
        return (
            <React.Fragment>
                <div className="py-4 ">
                    <div className="container">
                        <i className=" fas fa-heart">
                            <Titles name="WishList" title=""/>
                        </i>
                        <div className="row">
                            {(WishList.length > 0) ? (
                                WishList.map(favourite => {
                                    return <WishListItem key={favourite.id} WishListItem={favourite} removeWishList={removeWishList}/>;
                                })
                            ) : (
                                <EmptyWishList/>
                            )}

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    } else {
        return (
            <Redirect to="/login" />
        )
    }
}

export default connect(
    mapStateToProps
)(WishListItemsList);









// class WishListItemsList extends Component {
//
//
//     render() {
//         return (
//             <React.Fragment>
//                 <div className = "py-4 ">
//                     <div className = "container">
//                         <i className=" fas fa-heart">
//                             <Titles name = "WishList" title = ""/>
//                         </i>
//                         <div className="row">
//                             <ProductConsumer>
//                                 {list => {
//                                     return list.WishList.map( favourite =>{
//                                         return <WishListItem key={favourite.id} WishListItem={favourite} />;
//                                     })
//                                 }}
//                             </ProductConsumer>
//                         </div>
//                     </div>
//                 </div>
//             </React.Fragment>
//         );
//     }
// }