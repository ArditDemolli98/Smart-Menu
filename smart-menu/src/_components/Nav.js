import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Role } from '@/_helpers';
import { accountService } from '@/_services';
import Menu from "../components/Menu"


function Nav() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    // only show nav when logged in
    if (!user) return null;

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav">
                    <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                    <NavLink to="/profile" className="nav-item nav-link">Profile</NavLink>
                    <NavLink to="/menu" className="nav-item nav-link">Menu</NavLink>
                    <NavLink to="/index" className="nav-item nav-link">Contact</NavLink>
                    <NavLink to="/ReportABug" className="nav-item nav-link">Report a Bug</NavLink>
                    <NavLink to="/review" className="nav-item nav-link">Review</NavLink>
                    {user.role === Role.Admin &&
                        <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
                    }



                    <a onClick={accountService.logout} className="nav-item nav-link">Logout</a>
                </div>
            </nav>
            <Route path="/admin" component={AdminNav} />

        </div>
    );
}

function AdminNav({ match }) {
    const { path } = match;

    return (
        <nav className="admin-nav navbar navbar-expand navbar-light">
            <div className="navbar-nav">
                <NavLink to={`${path}/users`} className="nav-item nav-link">Users</NavLink>
            </div>
        </nav>
    );
}

export { Nav };