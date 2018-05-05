import React from 'react';

const EmailInput = ({onEmailChange, email, labelValue}) => {
    return (
        <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">{ labelValue ? labelValue : 'Email' }</label>
            <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                placeholder={email}
                onChange={onEmailChange}
            />
        </div>
    )
}

export default EmailInput;