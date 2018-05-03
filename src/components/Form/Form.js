import React from 'react';

const Form = (props) => {
    // console.log('Form props: ', props);

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white-50">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset className="ba b--transparent ph0 mh0">
                        {props.children}
                    </fieldset>
                </form>
            </main>
        </article>
    )
}

export default Form;