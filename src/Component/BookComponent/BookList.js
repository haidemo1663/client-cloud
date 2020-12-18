import React, { useEffect, useState } from "react";
import bookService from "../../Service/bookService";
import view from "../../image/view-details.svg";
import trash from "../../image/delete.svg";
export default function BookList(props) {
    const { history } = props;
    const [data, setData] = useState([]);
    useEffect(() => {
        let isMounted = true;
        async function load() {
            let book = await bookService.getBook();
            if (isMounted)
                setData(book.data);
        }
        load();
        return () => { isMounted = false }
    }, [data]);
    const addBook = () => {
        history.push("/admin/books/create");
    }
    const editBook = (id) => {
        history.push(`/admin/books/update/${id}`);
    }
    const deleteBook = async (id) => {
        await bookService.deleteBook(id);
    }
    return (
        <div className="table-user">
            <button className="btn btn-success" onClick={addBook}>
                <img src={view} alt="..." />
                    NEW BOOK
                </button>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) =>
                            <tr key={index} className={index % 2 === 0 ? "" : "iven"}>
                                <td>{index}</td>
                                <td className="photo">
                                    <img src={item.image} alt="..." />
                                </td>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>{item.price}</td>
                                <td className="action">
                                    <button className="btn btn-info" onClick={() => editBook(item.id)} >
                                        <img src={view} alt="..." />
                                    </button>
                                    <button className="btn btn-danger" onClick={() => deleteBook(item.id)}>
                                        <img src={trash} alt="..." />
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}