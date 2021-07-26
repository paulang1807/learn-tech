import React, { Component } from "react";

// import * as ACTION_TYPES from '../store/actions/action_types';
import * as ACTIONS from '../store/actions/actions';

import { connect } from 'react-redux';

class Container1 extends Component {

  render() {
    return (
      <div>
        <button onClick={() => console.log(this.props.prop1)}> Get State </button>
        <button onClick={() => this.props.action1()}> Dispatch Action 1 </button>
        <button onClick={() => this.props.action2()}> Dispatch Action 2 </button>
      </div>
    )}
}

function matchStateToProps(state) {
  return {
    prop1: state.prop1
  }

}

function mapDispatchToProps(dispatch) {
  return {
    action1: () => dispatch(ACTIONS.SUCCESS),
    action2: () => dispatch(ACTIONS.FAILURE)
  }

}

export default connect(matchStateToProps, mapDispatchToProps)(Container1);
