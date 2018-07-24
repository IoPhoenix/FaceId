import React from 'react';

const SumbitInput = ({onSubmit, message, value}) => {
    const messageDisplay = message ? 'db' : 'dn';

    return (
        <div className="submit relative">
            <p className={messageDisplay + " error dark-red mt3"}>{message}</p>
            <input
                onClick={onSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value={value}
            />
            <div id="loader" className="ml3"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default SumbitInput;