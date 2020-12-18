import React, { useState } from 'react';
import bookService from "../../Service/bookService";
function CreateBook(props) {
    const { history } = props;
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        title: "",
        author: "",
        price: "",
        image: "https://res.cloudinary.com/dm9bs55dz/image/upload/v1607675905/drawin/1131w-KemP-QdG6nc_w6yvtl.png"
    });
    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };
    const onSubmit = async (e) => {
        //Chặn các event mặc định của form
        e.preventDefault();
        //Gọi hàm validationForm() dùng để kiểm tra form
        console.log(values)
        await bookService.createBook(values);
        history.push("/admin/books");

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
        setValues({ ...values, image: file.secure_url });
        setLoading(false)
    }
    return (
        <div>
            <div className="container" style={{ paddingTop: "5%" }}>
                <form encType="multipart/form-data" onSubmit={e =>  onSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="text">Title:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="Enter title"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Author:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="author"
                            placeholder="Enter author"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Price:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            placeholder="Enter price"
                            onChange={handleChange}
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
                            : <img src={image} alt="..." style={{ width: '300px', margin: '50px' }} />
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
export default CreateBook;