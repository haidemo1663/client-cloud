import React, { useState } from 'react';
import userService from "../../Service/userService";
function CreateUser(props) {
    const {history}=props;
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        email:"",
        password:"",
        name:"",
        file:"https://res.cloudinary.com/dm9bs55dz/image/upload/v1598446540/drawin/oaroxj5npjaaerislkqb.png"
    });
    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
      };
    const onSubmit = async(e) => {
        //Chặn các event mặc định của form
        e.preventDefault();
       //Gọi hàm validationForm() dùng để kiểm tra form
        const validation = validationForm();
        //Kiểm tra lỗi của input trong form và hiển thị
        if (validation.error) {
            alert(validation.msg)
        }
        else
        {
            await userService.createUser(values);
            history.push("/admin/users");
        }
    }
    const validationForm = () => {
        const err = [];
        let returnData = {
            error: false,
            msg: []
        }
        const { email, password } =values
        //Kiểm tra email
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            err.push('Không đúng định dạng email')
        }
        //Kiểm tra password
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
        setValues({...values,file:file.secure_url});
        setLoading(false)
    }
    return (
        <div>
            <div className="container" style={{ paddingTop: "5%" }}>
                <form encType="multipart/form-data" onSubmit={e=>{onSubmit(e)}}>
                    <div className="form-group">
                        <label htmlFor="text">Email:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                            value={values.email}
                            required
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
                            required
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
                            required
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
                            : <img src={image} alt="..." style={{ width: '300px',margin:'50px' }} />
                        }
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                        </button>
                </form>

            </div>
        </div>
    );
}

export default CreateUser;