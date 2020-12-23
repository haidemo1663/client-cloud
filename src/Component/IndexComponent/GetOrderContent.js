import React from 'react';
import "./GetOrderContent.css"
export default function GetOrderContent(props) {
    const orderContent = props.item;
    console.log(orderContent);
    return (
        <>
            {orderContent?(
                    <div className="get-order-content">
                    <p>ID:<span>{orderContent.id}</span></p>
                    <p>DATE:<span>{orderContent.datetime}</span></p>
                    <p>NAME:<span>{orderContent.customer.name}</span></p>
                    <p>ADDRESS:<span>{orderContent.customer.address}</span></p>
                    <p>PHONE:<span>{orderContent.customer.phone}</span></p>
                    <h6>ORDER CONTENT</h6>
                    <div className="tb-content">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderContent.orderlist.map((item, index) => <tr key={index}>
                                        <td>{index}</td>
                                        <td>{item.book.title}</td>
                                        <td>{item.book.price}</td>
                                        <td>{item.quantity}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            ):<></>}
        </>
    );
}