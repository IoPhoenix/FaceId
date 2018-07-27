import React from 'react';
import Form from '../Form/Form';
import Legend from '../Legend/Legend';
import NameInput from '../NameInput/NameInput';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import SubmitInput from '../SubmitInput/SubmitInput';
import FormLink from '../FormLink/FormLink';
import { capitalize } from '../../helpers';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerName: '',
      registerEmail: '',
      registerPassword: '',
      message: ''
    }    
  }

  onNameChange = (e) => {
    this.setState({registerName: capitalize(e.target.value.trim()) });
  }

  onEmailChange = (e) => {
    this.setState({registerEmail: e.target.value.trim() });
  }

  onPasswordChange = (e) => {
    this.setState({registerPassword: e.target.value.trim() });
  }

  registerUser = () => {
     // show loading icon while processing request
     const loader = document.getElementById('loader');
     loader.style.visibility = 'visible';

      // clear all error messages:
      this.setState({ message: '' });

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
          this.setState({message: 'Failed to register'});
        }
      })
      .catch(err => this.setState({ message: err }))
      // hide loading icon, whether promise fulfilled or rejected
      .finally(() => loader.style.visibility = 'hidden');
  }

  onSubmit = () => {
    const { registerName, registerEmail, registerPassword } = this.state;

    if (!registerName || !registerEmail || !registerPassword) {
      this.setState({ message: 'Invalid credentials' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail)) {
      this.setState({ message: 'Invalid email format' });
    } else if (registerPassword.length < 8) {
      this.setState({ message: 'Password must be at least 8 characters long' });
    } else {
      // clear previous error messages
      this.setState({ message: '' });
      this.registerUser();  
    }
  }


  render() {
    return (
      <Form>
          <Legend value={'Register'} />
          <NameInput onNameChange={this.onNameChange} />
          <EmailInput onEmailChange={this.onEmailChange} />
          <PasswordInput onPasswordChange={this.onPasswordChange} />
          <SubmitInput 
              onSubmit={this.onSubmit}
              message={this.state.message}
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