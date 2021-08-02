import React, { Component } from 'react';
import history from './history';

import * as ACTIONS from '../store/actions/actions';

import { connect } from 'react-redux';

class AuthCheck extends Component {
    componentDidMount() {
        if(this.props.auth.isAuthenticated()) {
            this.props.login_success()
            history.replace('/')   // Used to redirect to home
        } else {
            this.props.login_failure()
            // history.replace('/')   // Used to redirect to home
        }
    }

    render() {
        return (
            <div>
                Authenticated: {this.props.is_Authenticated}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        is_Authenticated: state.auth_reducer.is_Authenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login_success: () => dispatch(ACTIONS.login_success()),
        login_failure: () => dispatch(ACTIONS.login_failure())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthCheck)