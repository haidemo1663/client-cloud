import React, { useEffect, useState } from 'react';
import "./userlist.css";
import view from "../../image/view-details.svg";
import trash from "../../image/delete.svg";
import userService from '../../Service/userService';
import plus from "../../image/plus.svg";

export default function Userlist(props) {
    const [values, setValues] = useState([]);
    const { history } = props;
    const addUser = () => {
        history.push("/admin/users/create");
    }
    const deleteUser = async (id) => {
        await userService.deleteUser(id);
        history.push("/admin/users/");

    }
    useEffect(() => {
        let isMounted = true;
        function load() {
            userService.getUser().then(result => {
                if(isMounted)
                    setValues(result.data);
            })
        }
        load()
        return ()=>{isMounted=false}
    }, [values])
    const editUser = (id) => {
        history.push(`/admin/users/update/${id}`);
    }
    return (
        <div className="table-user">
            <button className="btn btn-success" onClick={() => addUser()}>
                <img src={plus} alt="..." />
                    CREATE
                </button>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        values.map((item, index) =>
                            <tr key={item.id} className={index % 2 === 0 ? "" : "iven"}>
                                <td>{index}</td>
                                <td className="photo">
                                    <img src={item.file} alt="..." />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>*************</td>
                                <td className="action">
                                    <button className="btn btn-info" onClick={() => editUser(item.id)}>
                                        <img src={view} alt="..." />
                                    </button>
                                    <button className="btn btn-danger" onClick={() => deleteUser(item.id)}>
                                        <img src={trash} alt="..." />
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>);
}