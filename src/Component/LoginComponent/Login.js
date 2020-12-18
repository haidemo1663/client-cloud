import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import accountService from "../../Service/accountService";
import "./login.css"
export default function Login(props) {
    const { history } = props;
    const [values, setValues] = useState({
        email: "",
        pwd: ""
    });
    const [error, setError] = useState([]);
    const [cookies,setCookie]=useCookies(["user"]);
    const handleSubmit = async (event) => {
        if (event) event.preventDefault();
        //Kiểm tra lỗi của input trong form và hiển thị
        const validate = validationForm();
        if (validate.error) {
            setError(validate.msg);
            setValues({
                email: "",
                pwd: ""
            });
        }
         else {
            let result = await accountService.checkout(values);
            if (result.data)
            {
                (!cookies["user"])? setCookie("user",result.data.email): history.push('/admin');
                history.push('/admin');
            }
            else {
                setValues({
                    email: "",
                    pwd: ""
                });
                setError(["Tên Đăng Nhập Hoặc Mật Khẩu Không Chính Xác"]);
            }
        }
    };
    const validationForm = () => {
        const err = [];
        let returnData = {
            error: false,
            msg: []
        }
        const { email, pwd } = values
        //Kiểm tra email
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            err.push('Không đúng định dạng email')
        }
        //Kiểm tra password
        if (pwd.length < 8) {
            err.push('Mật khẩu phải lớn hơn 8 ký tự')
        }
        if (err.length > 0) {
            returnData = {
                error: true,
                msg: err
            }
        }
        return returnData;
    }

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    return (
        <div className='login-block'>
            <h3>LOGIN</h3>
            {
                error.length>0?
                    <div className="error-block">
                        <ul>
                            {error.map((err,index)=><li key={index}>{err}</li>)}
                        </ul>
                    </div>:<div></div>
            }
            <form className="form" onSubmit={e => { handleSubmit(e) }}>
                <div className="form-group">
                    <label htmlFor="text">Email:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        name="pwd"
                        placeholder="Enter password"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "20px" }}>
                    LOGIN
                        </button>
            </form>
        </div>
    );
}