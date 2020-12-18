import React from 'react';
import img from "../../image/img.jpg";
import mail from "../../image/email.svg"
import cart from "../../image/shopping-cart.svg";
import logo from "../../image/pawprint.svg";
import { Link } from "react-router-dom";
import "./Admin.css";
import Userlist from "../UserComponent/Userlist";
import CreateUser from "../UserComponent/createUser";
import UpdateUser from "../UserComponent/UpdateUser";
import BookList from "../BookComponent/BookList";
import CreateBook from "../BookComponent/CreateBook";
import UpdateBook from "../BookComponent/updateBook";
import Login from "../LoginComponent/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
export default function Admin() {
    return (
        <div>
            <Router>
                <div className="left-nav">
                    <div className="nav-title">
                        <div className="logo">
                            <img src={logo} alt="..." />
                        </div>
                        <span className="title">Gentelella Alela!</span>
                    </div>
                    <div className="nav-profile">
                        <div className="profile">
                            <img src={img} alt="..." />
                        </div>
                        <span className="title">WelCome Jhon</span>
                    </div>
                    <div className="general">
                        <p>GENERAL</p>
                        <div className="item">
                            <img src={logo} alt="..." /><span><Link to="/admin/users/" style={{ color: "#fff", fontSize: "18px", fontWeight: "300" }}>HOME</Link></span>
                        </div>
                        <div className="item">
                            <img src={logo} alt="..." /><span> PROFILE</span>
                        </div>
                        <div className="item">
                            <img src={logo} alt="..." /><span><Link to="/admin/users/" style={{ color: "#fff", fontSize: "18px", fontWeight: "300" }}>User</Link></span>
                        </div>
                        <div className="item">
                            <img src={logo} alt="..." /><span><Link to="/admin/books/" style={{ color: "#fff", fontSize: "18px", fontWeight: "300" }}>BOOK</Link></span>
                        </div>

                    </div>
                </div>
                <div className="container-contain">
                    <div className="nav-bar-head">
                        <div className="nav-title">
                            <img className="logo" src={logo} alt="..." />
                        </div>
                        <ul className="nav justify-content-end">
                            <li className="nav-item icon">
                                <img src={cart} alt="..." />
                            </li>
                            <li className="nav-item icon">
                                <img src={mail} alt="..." />
                            </li>
                        </ul>
                    </div>
                    <div style={{width:"90%"}}>
                    <Switch>
                        <Route path="/admin/users" exact component={Userlist}></Route>
                        <Route path="/admin/users/create"  component={CreateUser}></Route>
                        <Route path="/admin/users/update/:id"  component={UpdateUser}></Route>
                        <Route path="/admin/books" exact component={BookList}></Route>
                        <Route path="/admin/books/create"  component={CreateBook}></Route>
                        <Route path="/admin/books/update/:id" component={UpdateBook}></Route>
                        <Route path="/login" exact component={Login}></Route>
                    </Switch>
                </div>
                </div>
            </Router>
        </div>
    );
}
