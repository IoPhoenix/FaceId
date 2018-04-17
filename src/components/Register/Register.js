import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      error: ''
    }
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  onEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  onPasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  registerUser = () => {
      // clear all error messages:
      this.setState({ error: '' });

      fetch('https://calm-forest-65718.herokuapp.com/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        })
      })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else {
          this.setState({error: 'Failed to register'});
        }
      })
      .catch(err => this.setState({ error: err }));
  }

  onSubmit = () => {
    const { name, email, password } = this.state;

    if (!name || !email || !password) {
      this.setState({ error: 'Invalid credentials' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.setState({ error: 'Invalid email format' });
    } else if (password.length < 8) {
      this.setState({ error: 'Password must be at least 8 characters long' });
    } else {
      this.registerUser();  
    }
  }


  render() {
    const { onRouteChange } = this.props;
    const { error } = this.state;
    const errorDisplay = error ? 'db' : 'dn';

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white-50">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
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
            <div>
              <p className={errorDisplay + " dark-red mt0"}>{error}</p>
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={this.onSubmit}
              />
            </div>
            <div className="lh-copy mt3">
                <p
                    onClick={() => onRouteChange('signin')}
                    className="mt4 f6 link dim db pointer black">
                     Already have an account? Sign In
                </p>
            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default Register;