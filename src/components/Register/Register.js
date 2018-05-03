import React from 'react';
import Form from '../Form/Form';
import Legend from '../Legend/Legend';
import NameInput from '../NameInput/NameInput';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import SubmitInput from '../SubmitInput/SubmitInput';
import FormLink from '../FormLink/FormLink';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerName: '',
      registerEmail: '',
      registerPassword: '',
      registerError: ''
    }

  console.log('props: ', props);
    
  }

  onNameChange = (e) => {
    this.setState({registerName: e.target.value});
    console.log('this.state for name: ', this.state);
  }

  onEmailChange = (e) => {
    this.setState({registerEmail: e.target.value});
    console.log('this.state for email: ', this.state);
  }

  onPasswordChange = (e) => {
    this.setState({registerPassword: e.target.value});
    console.log('this.state for password: ', this.state);
  }

  registerUser = () => {
      // clear all error messages:
      this.setState({ registerError: '' });

      fetch('https://calm-forest-65718.herokuapp.com/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: this.state.registerName,
          email: this.state.registerEmail,
          password: this.state.registerPassword
        })
      })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else {
          this.setState({registerError: 'Failed to register'});
        }
      })
      .catch(err => this.setState({ registerError: err }));
  }

  onSubmit = () => {
    console.log('Submit button was clicked!');
    const { registerName, registerEmail, registerPassword } = this.state;

    if (!registerName || !registerEmail || !registerPassword) {
      this.setState({ registerError: 'Invalid credentials' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail)) {
      this.setState({ registerError: 'Invalid email format' });
    } else if (registerPassword.length < 8) {
      this.setState({ registerError: 'Password must be at least 8 characters long' });
    } else {
      this.registerUser();  
    }
  }


  render() {
    console.log('This is REGISTER component');
    return (
      <Form>
          <Legend value={'Register'} />
          <NameInput onNameChange={this.onNameChange} />
          <EmailInput onEmailChange={this.onEmailChange} />
          <PasswordInput onPasswordChange={this.onPasswordChange} />
          <SubmitInput 
              onSubmit={this.onSubmit}
              error={this.state.registerError}
              value='Register' />
          <FormLink
            onRouteChange={this.props.onRouteChange} 
            value='Already have an account? Sign In' 
            path='signin' />
      </Form> 
    )
  }
}

export default Register;