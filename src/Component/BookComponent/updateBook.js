import React, { useState, useEffect } from 'react';
import bookService from '../../Service/bookService';
function UpdateBook(props) {
    const [values, setValues] = useState({
        title:"",
        author:"",
        price:0,
        image:""
    });
    const [image, setImage] = useState('');
    const { history } = props;
    const [loading, setLoading] = useState(false);
    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };
    useEffect(() => {
       async function load(){
        let book= await bookService.getBookById(props.match.params.id);
        setValues(book.data);
        setImage(book.data.image)
        }
        load();
    },[props.match.params.id])
    const onSubmit = async (e) => {
        //Chặn các event mặc định của form
        e.preventDefault();
        //Gọi hàm validationForm() dùng để kiểm tra form

        //Kiểm tra lỗi của input trong form và hiển thị
            await bookService.updateBook(values,props.match.params.id);
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
                <form encType="multipart/form-data" onSubmit={e => { onSubmit(e) }}>
                    <div className="form-group">
                        <label htmlFor="text">Title:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="Enter title"
                            onChange={handleChange}
                            value={values.title}
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
                            value={values.author}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Price:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            onChange={handleChange}
                            value={values.price}
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
                            : <img src={image} alt="..." style={{ width: '300px', margin: "50px 0" }} />
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

export default UpdateBook;