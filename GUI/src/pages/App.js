import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Link from './link';
import Login from './login';
import Laboratory from './laboratory';
import Notice from './notice';
import Administrator from './administrator';
import UserInfo from './userInfo';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Link} />
                    <Route path="/login" component={Login} />
                    <Route path="/laboratory" component={Laboratory} />
                    <Route path="/notice" component={Notice} />
                    <Route path="/administrator" component={Administrator} />
                    <Route path="/userInfo" component={UserInfo} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;