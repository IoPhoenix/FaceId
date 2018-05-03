import React from 'react';

const PasswordInput = ({onPasswordChange}) => {
    return (
        <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
            />
        </div>
    )
}

export default PasswordInput;