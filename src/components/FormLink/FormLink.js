import React from 'react';

const FormLink = ({onRouteChange, value, path}) => {
    return (
        <div className="lh-copy mt3">
            <p
                onClick={() => onRouteChange(path)}
                className="f6 link dim db pointer black">
                { value }
            </p>
        </div>
    )
}

export default FormLink;