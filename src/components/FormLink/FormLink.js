import React from 'react';

const FormLink = ({onRouteChange, value}) => {
    return (
        <div className="register-link lh-copy mt3">
            <p
                onClick={() => onRouteChange('register')}
                className="mt4 f6 link dim db pointer black">
                { value }
            </p>
        </div>
    )
}

export default FormLink;