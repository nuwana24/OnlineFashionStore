import React, {Component} from 'react';

import WishListItems from './WishListItem';
import NavBar from "../NavBar";

export default function WishList({value}) {

    const {WishList} = value ;

    return (
        <div>
            <NavBar />
        <div className="container-fluid">
            {WishList.map(item => {
                return <WishListItems key = {item.id} item={item} value={value}/>
            })}

        </div>
        </div>
    );
}