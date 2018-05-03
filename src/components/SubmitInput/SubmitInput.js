import React from 'react';

const SumbitInput = ({onSubmit, error, value}) => {
    const errorDisplay = error ? 'db' : 'dn';

    return (
        <div className="submit">
            <p className={errorDisplay + " dark-red mt0"}>{error}</p>
            <input
                onClick={onSubmit}
                className="ma2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value={value}
            />
        </div>
    )
}

export default SumbitInput;