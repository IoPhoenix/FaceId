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
      message: ''
    }    
  }

  onNameChange = (e) => {
    this.setState({registerName: e.target.value});
  }

  onEmailChange = (e) => {
    this.setState({registerEmail: e.target.value});
  }

  onPasswordChange = (e) => {
    this.setState({registerPassword: e.target.value});
  }

  registerUser = () => {
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
      .catch(err => this.setState({ message: err }));
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