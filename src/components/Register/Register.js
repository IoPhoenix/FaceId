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
      registerPassword: ''
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


      const dataToSend = {
        name: this.state.registerName,
        email: this.state.registerEmail,
        password: this.state.registerPassword
      }

       // send user input to database:
       this.props.sendUserData(dataToSend, 'register');
         
      // hide loading icon
      loader.style.visibility = 'hidden';
  }


  onSubmit = () => {
    const { registerName, registerEmail, registerPassword } = this.state;

    if (!registerName || !registerEmail || !registerPassword) {
      this.props.changeErrorMessage('Invalid credentials');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail)) {
      this.props.changeErrorMessage('Invalid email format');
    } else if (registerPassword.length < 8) {
      this.props.changeErrorMessage('Password must be at least 8 characters long');
    } else {
      // clear previous error messages
      this.props.changeErrorMessage('');
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
              message={this.props.message}
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