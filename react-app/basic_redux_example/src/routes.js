import React, { Component } from "react";

import Component1 from "./functional/Component1";
import Callback from "./functional/callback";

import Container1 from "./containers/Container1";
import Header from "./containers/Header";

import history from "./utils/history";

import { Router, Route, Switch } from 'react-router';

import Auth from "./utils/auth";

export const auth = new Auth()

const handleAuthentication = props => {
    if (props.location.hash) {
        auth.handleAuth()
    }
}
class Routes extends Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Header />
                        <Switch>
                            <Route exact path="/home" render = {() => <Container1 auth={auth} />}/>
                            <Route  path="/callback" render = {(props) => { handleAuthentication(props); return <Callback />}} />
                            <Route path="/home/component:id" render = {(props) => <Component1 {...props}/>}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Routes