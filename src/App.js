import React from 'react';
import "./App.css";
import Userlist from "./Component/UserComponent/Userlist";
import BookList from "./Component/BookComponent/BookList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./Component/AdminComponent/Admin";
import Login from "./Component/LoginComponent/Login";
import IndexComponent from './Component/IndexComponent/IndexComponent';
import Order from './Component/IndexComponent/Order';
import shortid from "shortid";
import { useCookies} from 'react-cookie';
import GetOrder from './Component/IndexComponent/GetOrder';
 function App() {
    const [cookies, setCookie]=useCookies(["SessionId","Cart","User"]);
    if(!cookies["SessionId"]){
        setCookie("SessionId",shortid.generate());
        setCookie("Cart",[]);
    }
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={IndexComponent}></Route>
                    <Route path="/orders/:id"  component={Order}></Route>
                    <Route path="/admin" component={Admin}></Route>
                    <Route path="/login" exact component={Login}></Route>
                    <Route path="/admin/users" component={Userlist}></Route>
                    <Route path="/admin/books" component={BookList}></Route>
                    <Route path="/admin/orders" component={GetOrder}></Route>
                    
                </Switch>
            </div>
        </Router>
    );
}

export default App;
