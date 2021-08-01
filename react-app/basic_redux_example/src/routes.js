import React, { Component } from "react";

import Component1 from "./functional/Component1";
import Callback from "./functional/callback";
import ProtectedRoute from "./functional/protectedroutes";
import UnauthRedirect from "./functional/unauthredirect";

import Container1 from "./containers/Container1";
import Header from "./containers/Header";
import HooksContainer1 from "./hooks/HooksContainer1";

import history from "./utils/history";
import Auth from "./utils/auth";
import AuthCheck from "./utils/authcheck";

import { Router, Route, Switch, Redirect } from 'react-router';

export const auth = new Auth()

const handleAuthentication = props => {
    if (props.location.hash) {
        auth.handleAuth()
    }
}

// Higher Order Component
const PrivateRoute = ({component:Component, auth }) => (
        <Route render={props => auth.isAuthenticated() === true
        ? <Component auth={auth} {...props} />
        : <Redirect to={{pathname:'/redirect'}} />
    }
    />
)
class Routes extends Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Header auth={auth}/>
                        <Switch>
                            <Route exact path="/home" render = {() => <Container1 auth={auth} />}/>
                            <Route path="/authcheck" render = {() => <AuthCheck auth={auth} />}/>
                            <Route path="/redirect" component={UnauthRedirect} />
                            <Route path="/hookscontainer" component={HooksContainer1} />
                            <Route  path="/callback" render = {(props) => { handleAuthentication(props); return <Callback />}} />
                            <Route path="/home/component:id" render = {(props) => <Component1 {...props}/>}/>

                            <PrivateRoute path="/privateroute" auth={auth} component={ProtectedRoute} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Routes