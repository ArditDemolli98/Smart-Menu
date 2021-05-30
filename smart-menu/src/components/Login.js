import './Login.css';
import App from "../App";
import Home from "./userLogon/Home";
import LoginF from "./userLogon/LoginF";
import Register from "./userLogon/Register";
import Navbar from "./userLogon/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import { useEffect, useState } from 'react';
function Login(){
    const [name, setName] = useState('');

    useEffect( () => {
        (
            async() => {
                const response = await fetch('http://localhost:5000/api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                const content = await response.json();

                setName(content.name);
            }
        )();
    });

    return(
        <div className="Login">
            <BrowserRouter>
                <Navbar name={name} setName={setName} />
                
                <main className="form-signin">
                    <Route path="/" exact component={() => <Home name={name} />}/>
                    <Route path="/login" component={() => <LoginF setName={setName}/>}/>
                    <Route path="/register" component={Register}/>
                </main>
            </BrowserRouter>
        </div>
    );
}


export default Login;