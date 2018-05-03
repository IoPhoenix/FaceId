import React from 'react';

const NameInput = ({onNameChange}) => {
    return (
        <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
            <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={this.onNameChange}
            />
        </div>
    )
}

export default NameInput;