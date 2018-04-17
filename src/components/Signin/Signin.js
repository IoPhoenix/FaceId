import React from 'react';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          signInEmail: '',
          signInPassword: '',
          signInError: ''
        }
      }

    onEmailChange = (e) => {
        this.setState({signInEmail: e.target.value})
    }    

    onPasswordChange = (e) => {
        this.setState({signInPassword: e.target.value})
    }

    signinUser = () => {
        // clear error messages:
        this.setState({ error: '' });

        fetch('https://calm-forest-65718.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            // if user exists, proceed
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home');
            } else {
                this.setState({signInError: 'Sign in failed'});
            }
        })
        .catch(err => this.setState({error: err}));
    }

    onSubmit = () => {
        const { signInEmail, signInPassword } = this.state;

        if (!signInEmail || !signInPassword || signInPassword.length < 8) {
            this.setState({ signInError: 'Invalid credentials' });
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInEmail)) {
            this.setState({ signInError: 'Invalid email format' });
        } else {
            this.signinUser();  
        }
      }

    render() {
        const { onRouteChange } = this.props;
        const { signInError } = this.state;
        const errorDisplay = signInError ? 'db' : 'dn';

        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                                onChange={this.onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <p className={errorDisplay + " dark-red mt0"}>{signInError}</p>
                        <input
                            onClick={this.onSubmit}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in"
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p
                            onClick={() => onRouteChange('register')}
                            className="mt4 f6 link dim db pointer near-white">
                            Register
                        </p>
                    </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;