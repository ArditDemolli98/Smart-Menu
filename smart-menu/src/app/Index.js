import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { Role } from '@/_helpers';
import { accountService } from '@/_services';
import { Nav, PrivateRoute, Alert } from '@/_components';
import { Home } from '@/home';
import { Profile } from '@/profile';
import { Admin } from '@/admin';
import { Account } from '@/account';
import { Menu } from '../components/Menu';
import { ShowMenu } from '../components/ShowMenu';
import { Index } from '../contactform/Index';
import { Report } from '../ReportABug/Report';
import { Review } from '../review/Review';

function App() {
    const { pathname } = useLocation();
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    return (
        <div className={'app-container' + (user && ' bg-light')}>
            <Nav />
            <Alert />
            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
                <Route path="/account" component={Account} />
                <Route path="/menu" component={Menu} />
                <Route path="/showmenu/" component={ShowMenu} />
                <PrivateRoute path="/index" component={Index} />
                <PrivateRoute path="/ReportABug" component={Report} />
                <PrivateRoute path="/review" component={Review} />
                <Redirect from="*" to="/" />
            </Switch>
        </div>
    );
}

export { App };