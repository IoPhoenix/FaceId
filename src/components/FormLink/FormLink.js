import React from 'react';

const FormLink = ({onRouteChange, value, route}) => {
    return (
        <div className="lh-copy mt3">
            <p
                onClick={() => onRouteChange({ route })}
                className="f6 link dim db pointer black">
                { value }
            </p>
        </div>
    )
}

export default FormLink;