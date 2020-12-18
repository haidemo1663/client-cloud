import React from "react";
import "./cart.css";
import {Link} from 'react-router-dom';
export default function Cart(props) {
    const listItem = props.listItem;
    const hidden = props.hidden;
    const sessionid = props.sessionid;
    const total = listItem.reduce((value, curr) => value + curr.total, 0);
    return (
        <div className={hidden ? "shopping-cart-hidden" : "shopping-cart"}>
            <div className="shopping-cart-header">
                <span className="lighter-text">Total:</span>
                <span className="main-color-text">{total} VND</span>
            </div>

            <ul className="shopping-cart-items">
                {
                    listItem.map((item, index) => {
                        return (
                            <li className="clearfix" key={index}>
                                <img src={item.book.image} alt="item1" />
                                <div className="item-content">
                                    <p className="item-name">{item.book.title}</p>
                                    <span className="item-price">Price: {item.total}</span>
                                    <span className="item-quantity">Quantity: {item.quantity}</span>
                                </div>
                            </li>)
                    })
                }
            </ul>
            <Link to={'/orders/' + sessionid}><button className="btn btn-check-out">Check out</button></Link>
        </div>
    );
}