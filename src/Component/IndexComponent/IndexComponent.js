import React, { useEffect, useState } from 'react';
import mail from "../../image/email.svg"
import cart from "../../image/shopping-cart.svg";
import logo from "../../image/pawprint.svg";
import bookService from '../../Service/bookService';
import "./index.css";
import { useCookies } from 'react-cookie';
import Cartt from "./Cart.js";
export default function IndexComponent() {
    const [values, setValues] = useState([]);
    const [cookies, setCookie] = useCookies([]);
    const [count, setCount] = useState(cookies["Cart"].length);
    const [hidden,setHidden]=useState(true);
    useEffect(() => {
        //setCount(cookies["Cart"].length)
        let isAmounted = true;
        async function load() {
            let value = await bookService.getBook();
            if (isAmounted)
                setValues(value.data);
        }
        load();
        return () => { isAmounted = false };
    }, [count]);
    const addtocard = async (id) => {
        var total = function () {
            return parseInt(product.data.price * 1)
        }
        const product = await bookService.getBookById(id);
        var list = cookies["Cart"];
        if (list.length > 0) {
            var index = list.findIndex(item => item.book.id === id);
            if (index < 0) { list.push({ 'book': product.data, 'quantity': 1, 'total': total() }) }
            else {
                list.map(function (item) {
                    if (item.book.id === id) {
                        ++item.quantity;
                    }
                    item.total = item.book.price * item.quantity;
                    return item;
                })
            }
        }
        else {
            list.push({ 'book': product.data, 'quantity': 1, 'total': total() })
        }
        setCookie("Cart", list);
        setCount(list.length);
    };
    return (
        <div>
            <div className="container-contain">
                <div className="nav-bar-head">
                    <div className="nav-title">
                        <img className="logo" src={logo} alt="..." />
                    </div>
                    <ul className="nav justify-content-end">
                        <li className="nav-item icon">
                            <img src={mail} alt="..." />
                        </li>
                        <li className="nav-item icon" style={{ display: "flex" }}>
                            <img src={cart} alt="..." width={"30px"} onClick={()=>setHidden(!hidden)}/>
                            <div style={
                                { borderRadius: "50%", width: "25px", height: "25px", textAlign: "center", backgroundColor: "#d86161" }
                            }>{count}</div>
                        </li>
                    </ul>
                </div>
                <Cartt listItem={cookies["Cart"]} hidden={hidden} sessionid={cookies["SessionId"]}/>
                <div className="container m-4">
                    <div className="row row-cols-1 row-cols-md-4">
                        {
                            values.map((item) =>
                                <div className="col" key={item.id}>
                                    <div className="card">
                                        <img src={item.image} className="card-img-top" alt="..." />
                                    </div>
                                    <div className="card-body" style={{ height: "150px" }}>
                                        <h6 className="card-title">{item.title}</h6>
                                        <p className="card-text">Author:  {item.author}</p>
                                        <p className="card-text">Price:  {item.price}</p>
                                        <button className="btn btn-add-to-card" onClick={() => addtocard(item.id)}>Add To Card</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}