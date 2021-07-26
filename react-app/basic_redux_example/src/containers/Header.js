import React, { Component } from "react";
import { Link } from 'react-router-dom';
import '../srcStyles.css'

class Header extends Component {
    render() {
        return (
            <div>
                {/* Link can also accept an object like the following
                <Link to={{path=: 'path_for_routing', search:, hash:hash_tag_on_page_to_go_to, state: }} */}
                    <Link to='/home' className='StyleSpace'>
                        Home
                    </Link>
                    <Link to='/component1' className='StyleSpace'>
                        Component1
                    </Link>
                    <Link to='/component2' className='StyleSpace'>
                        Component2
                    </Link>
                    <Link to='/component3' className='StyleSpace'>
                        Component3
                    </Link>
            </div>
        )   
    }
}

export default Header
