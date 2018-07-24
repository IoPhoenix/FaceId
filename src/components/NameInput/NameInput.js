import React from 'react';

const NameInput = ({onNameChange, name, labelValue}) => {
    return (
        <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="name">{ labelValue ? labelValue : 'Name' }</label>
            <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                placeholder={name}
                onChange={onNameChange}
            />
        </div>
    )
}

export default NameInput;