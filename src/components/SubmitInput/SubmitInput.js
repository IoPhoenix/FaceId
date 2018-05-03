import React from 'react';

const SumbitInput = ({onSubmit, signInError, value}) => {
    const errorDisplay = signInError ? 'db' : 'dn';

    return (
        <div className="submit">
            <p className={errorDisplay + " dark-red mt0"}>{signInError}</p>
            <input
                onClick={onSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value={value}
            />
        </div>
    )
}

export default SumbitInput;