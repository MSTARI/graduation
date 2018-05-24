import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Link from './link';
import Login from './login';
import Order from './order';
import Unorder from './unorder';
import Notice from './notice';
import Administrator from './administrator';
import UserInfo from './userInfo';

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Link} />
                    <Route path="/login" component={Login} />
                    <Route path="/order" component={Order} />
                    <Route path="/unorder" component={Unorder} />
                    <Route path="/notice" component={Notice} />
                    <Route path="/administrator" component={Administrator} />
                    <Route path="/userInfo" component={UserInfo} />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;