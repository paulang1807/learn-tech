import React, { Component } from "react";
import { Link } from 'react-router-dom';
import '../srcStyles.css'

import { connect } from 'react-redux';

class Header extends Component {
    state = {
        nums: [
            {id: 1},
            {id: 2},
            {id: 3},
        ]
    }
    render() {
        return (
            <div>
                {/* Link can also accept an object like the following
                <Link to={{path=: 'path_for_routing', search:, hash:hash_tag_on_page_to_go_to, state: }} */}
                    <Link to='/home' className='StyleSpace'>
                        Home
                    </Link>
                    <Link to="/privateroute" className="StyleSpace">
                        PrivateRoute
                    </Link>
                    {!this.props.is_Authenticated
                        ? <button onClick={() => this.props.auth.login()}>Login {this.props.is_Authenticated}</button>
                        : <button onClick={() => this.props.auth.logout()}>Logout {this.props.is_Authenticated}</button>
                    }
                    {this.state.nums.map(i => 
                    <Link key={i.id} to={{pathname: '/home/component' + i.id}} className='StyleSpace'>
                        Component{i.id}
                    </Link>

                    

                    )}
            </div>
        )   
    }
}

function mapStateToProps(state){
    return {
        is_Authenticated: state.auth_reducer.is_Authenticated
    }

}

export default connect(mapStateToProps)(Header);
