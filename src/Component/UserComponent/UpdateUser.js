import React, { useState, useEffect } from 'react';
import userService from "../../Service/userService";
function UpdateUser(props) {
    const id=props.match.params.id;
    const [values, setValues] = useState({
        email:"",
        password:"",
        name:"",
        file:""
    });
    const [image, setImage] = useState('');
    const { history } = props;
    const [loading, setLoading] = useState(false);
    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };
    useEffect( () => {
        let isAmounted=true;
         userService.getUserById(id)
            .then(result => {
                if(isAmounted){
                setValues(result.data);
                setImage(result.data.file)
                }
            });
           return ()=>{isAmounted=false}
        },[id])
    const onSubmit = async (e) => {
        //Chặn các event mặc định của form
        e.preventDefault();
        //Gọi hàm validationForm() dùng để kiểm tra form
        const validation = validationForm()

        //Kiểm tra lỗi của input trong form và hiển thị
        if (validation.error) {
            alert(validation.msg)
        } else {
            console.log(JSON.stringify(values));
            await userService.updateUser(values,id);
            history.push("/admin/users");
        }
    }
    const validationForm = () => {
        const err = [];
        let returnData = {
            error: false,
            msg: []
        }
        const { email, password } = values
        //Kiểm tra email
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            err.push('Không đúng định dạng email')
        }
        if (password.length < 8) {
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
    const uploadImage = async e => {

        const files = e.target.files

        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'rl9zwq0o')
        setLoading(true)
        const res = await fetch(
            '	https://api.cloudinary.com/v1_1/dm9bs55dz/image/upload ',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()

        setImage(file.secure_url)
        setValues({ ...values, file: file.secure_url });
        setLoading(false)
    }
    return (
        <div>
            <div className="container" style={{ paddingTop: "5%" }}>
                <form encType="multipart/form-data" onSubmit={e => { onSubmit(e) }}>
                    <div className="form-group">
                        <label htmlFor="text">Email:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                            value={values.email}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Enter password"
                            onChange={handleChange}
                            value={values.password}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Enter your name"
                            onChange={handleChange}
                            value={values.name}
                        />
                    </div>
                    <div className="form-group">
                        <h3>Upload Image</h3>
                        <input
                            type="file"
                            name="files"
                            placeholder="Upload an image"
                            onChange={uploadImage}
                        />
                        <br />
                        {loading ?
                            <h3>Loading...</h3>
                            : <img src={image} alt="..." style={{ width: '300px', margin: "50px 0 0 0" }} />
                        }
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Save Changes
                        </button>
                </form>

            </div>
        </div>
    );
}

export default UpdateUser;