import React, { useEffect, useState } from "react";
import orderService from "../../Service/orderService";
import GetOrderContent from "./GetOrderContent";
import './GetOrder.css'
export default function GetOrder(props) {
    const { history } = props;
    const [data, setData] = useState([]);
    const [views, setView] = useState(null);
    useEffect(() => {
        let isMounted = true;
        async function load() {
            let book = await orderService.getOrder()
            if (isMounted)
                setData(book.data);
        }
        load();
        return () => { isMounted = false }
    }, [views,data]);
    const updateStatus=async (id) =>{
       await orderService.updateStatus(id);
    }
    return (
        <div className="table-order">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th className="stt">#</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) =>
                            <tr key={index} className={index % 2 === 0 ? "" : "iven"}>
                                <td>{index}</td>
                                <td>{item.customer.name}</td>
                                <td>{item.datetime}</td>
                                <td>{item.total}</td>
                                <td>
                                    {
                                        item.status?<button className="btn btn-danger">Actived</button>
                                        :
                                        <button className="btn btn-success" onClick={() => updateStatus(item.id)}>Active</button>
                                    }
                                </td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => setView(item)}>View</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <GetOrderContent item={views} />
        </div>
    );
}