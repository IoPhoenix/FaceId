import React from 'react';

const FormLink = ({onRouteChange, value, path}) => {
    return (
        <div className="lh-copy">
            <p
                onClick={() => onRouteChange(path)}
                className="f6 mt4 link dim db pointer black">
                { value }
            </p>
        </div>
    )
}

export default FormLink;