import React, { useState } from "react";
import { useCookies } from "react-cookie";
import oderService from "../../Service/oderService";
import './order.css';
export default function Order(props) {
    const { history } = props;
    const [values, setValues] = useState({
        name: "",
        address: "",
        phone: "",

    });
    const [cookies, setCookie] = useCookies([]);
    const listItem = cookies["Cart"];
    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };
    const onSubmit = async (e) => {
        //Chặn các event mặc định của form
        e.preventDefault();
        //Gọi hàm validationForm() dùng để kiểm tra form
        const validation = validationForm();
        //Kiểm tra lỗi của input trong form và hiển thị
        if (validation.error) {
            alert(validation.msg)
        }
        else {
            let total=listItem.reduce((value,crr)=>value+crr.total,0);
            let order={
                customer:values,
                orderlist:listItem,
                total: total
            }
            console.log(order);
            await oderService.createOrder(order);
            setCookie("Cart", []);
            history.push("/");
        }
    }
    const validationForm = () => {
        const err = [];
        let returnData = {
            error: false,
            msg: []
        }
        if (err.length > 0) {
            returnData = {
                error: true,
                msg: err
            }
        }
        return returnData;
    }
    return (
        <div>
            <div className="container" style={{ paddingTop: "5%" }}>
                <form encType="multipart/form-data" onSubmit={e => { onSubmit(e) }} className="customer-content">
                    <p>Please enter Your Infomation</p>
                    <div className="form-group">
                        <label htmlFor="text">Name :</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Enter Your Name"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            placeholder="Enter Your Address"
                            onChange={handleChange}

                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Phone :</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            placeholder="Enter Your Phone"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                        </button>
                </form>
                <ul className="shopping-cart-items" style={{margin:"0 50px"}}>
                    <p>Your Order Content</p>
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
            </div>
        </div>
    );
}