import React from 'react';

const SumbitInput = (props) => {
    const messageDisplay = props.message ? 'db' : 'dn';

    return (
        <div className="submit relative">
            {/* <p className={messageDisplay + " error dark-red mt3"}>{props.message}</p> */}
            <input
                onClick={props.onSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value={props.value}
            />
            <div id="loader" className="ml3"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default SumbitInput;