import React, { Component } from "react";

// import * as ACTION_TYPES from '../store/actions/action_types';
import * as ACTIONS from '../store/actions/actions';

import { connect } from 'react-redux';

class Container1 extends Component {

  render() {
    const prop2text = "sample text"
    return (
      <div>
        <button onClick={() => this.props.auth.login()}> Login </button>
        <button onClick={() => console.log(this.props.prop1)}> Get State </button>
        <button onClick={() => this.props.action1()}> Dispatch Action 1 </button>
        <button onClick={() => this.props.action2()}> Dispatch Action 2 </button>
        <button onClick={() => this.props.actioncreator1()}> Dispatch Action Creator 1 </button>
        <button onClick={() => this.props.actioncreator2()}> Dispatch Action Creator 2 </button>
        <button onClick={() => this.props.actioncreator3(prop2text)}> Dispatch Action Creator 3 </button>
        <button onClick={() => console.log(this.props.prop2)}> Get User Input </button>
        <p>{this.props.prop1}</p>
        <p>{this.props.prop2}</p>
      </div>
    )}
}

function matchStateToProps(state) {
  return {
    prop1: state.reducer1.prop1,
    prop2: state.reducer2.prop2
  }

}

function mapDispatchToProps(dispatch) {
  return {
    action1: () => dispatch(ACTIONS.SUCCESS),
    action2: () => dispatch(ACTIONS.FAILURE),
    actioncreator1: () => dispatch(ACTIONS.success()),
    actioncreator2: () => dispatch(ACTIONS.failure()),
    actioncreator3: (text) => dispatch(ACTIONS.user_input(text))
  }

}

export default connect(matchStateToProps, mapDispatchToProps)(Container1);
