import React from 'react';
import {Link} from "react-router-dom";
const Navbar = () =>{

        


    return(
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <Link to="./Home" className="navbar-brand">Home</Link>
                    
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item active">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/register" className="nav-link" >Register</Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;