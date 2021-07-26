import React, { Component } from "react";
import { Link } from 'react-router-dom';
import '../srcStyles.css'

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
                    {this.state.nums.map(i => 
                    <Link key={i.id} to={{pathname: '/home/component' + i.id}} className='StyleSpace'>
                        Component{i.id}
                    </Link>

                    

                    )}
            </div>
        )   
    }
}

export default Header
