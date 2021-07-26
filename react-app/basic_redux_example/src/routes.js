import React, { Component } from "react";

import Component1 from "./functional/Component1";

import Container1 from "./containers/Container1";
import Header from "./containers/Header";

import history from "./utils/history";

import { Router, Route, Switch } from 'react-router';

class Routes extends Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Header />
                        <Switch>
                            <Route exact path="/home" component={Container1}/>
                            <Route path="/home/component:id" render = {(props) => <Component1 {...props}/>}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Routes