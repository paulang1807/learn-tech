import React, { Component } from "react";

import Component1 from "./functional/Component1";
import Component2 from "./functional/Component2";
import Component3 from "./functional/Component3";

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
                            <Route path="/home/component1" component={Component1}/>
                            <Route path="/home/component2" component={Component2}/>
                            <Route path="/home/component3" component={Component3}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Routes