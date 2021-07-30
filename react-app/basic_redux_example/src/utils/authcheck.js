import React, { Component } from 'react';
import history from './history';

import * as ACTIONS from '../store/actions/actions';

import { connect } from 'react-redux';

class AuthCheck extends Component {
    componentDidMount() {
        if(this.props.auth.isAuthenticated()) {
            this.props.actioncreator5()
            // history.replace('/')   // Used to redirect to home
        } else {
            this.props.actioncreator6()
            // history.replace('/')   // Used to redirect to home
        }
    }

    render() {
        return (
            <div>
                Authenticated: {this.props.auth_prop}
            </div>
        )
    }
}


function matchStateToProps(state) {
    return {
        auth_prop: state.auth_reducer.auth_prop
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actioncreator5: () => dispatch(ACTIONS.login_success()),
        actioncreator6: () => dispatch(ACTIONS.login_failure)
    }
}


export default connect(matchStateToProps, mapDispatchToProps)(AuthCheck) 