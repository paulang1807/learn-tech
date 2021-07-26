import React from 'react';

function Component1(props) {
    return (
        <div>
            Component {props.match.params.id}
            {console.log(props)}
        </div>

    )
}

export default Component1