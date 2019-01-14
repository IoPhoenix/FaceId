import React from 'react';
// import {DATABASE_LINK} from '../../constants.js';
import Form from '../Form/Form';
import Legend from '../Legend/Legend';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import SubmitInput from '../SubmitInput/SubmitInput';
import FormLink from '../FormLink/FormLink';


class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          signInEmail: '',
          signInPassword: ''
        }
      }

    onEmailChange = (e) => {
        this.setState({signInEmail: e.target.value})
    }    

    onPasswordChange = (e) => {
        this.setState({signInPassword: e.target.value})
    }


    signinUser = () => {
        // show loading icon while processing request
        const loader = document.getElementById('loader');
        loader.style.visibility = 'visible';


        // clear previously submitted images
        this.props.resetImageData();


        const dataToSend = {
            email: this.state.signInEmail,
            password: this.state.signInPassword
        }

        // send user input to database:
        this.props.sendUserData(dataToSend, 'signin');

        // hide loading icon
       loader.style.visibility = 'hidden';
    }


    onSubmit = () => {
        const { signInEmail, signInPassword } = this.state;

        if (!signInEmail || !signInPassword || signInPassword.length < 8) {
            this.props.changeErrorMessage('Invalid credentials');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInEmail)) {
            this.props.changeErrorMessage('Invalid email format');
        } else {
            // clear previous error messages
            this.props.changeErrorMessage('');
            this.signinUser();  
        }
      }

    render() {
        return (
            <Form>
                <Legend value={'Sign In'} />
                <EmailInput onEmailChange={this.onEmailChange} />
                <PasswordInput onPasswordChange={this.onPasswordChange} />
                <SubmitInput 
                    onSubmit={this.onSubmit}
                    message={this.props.message}
                    value='Sign in' />
                <FormLink 
                    onRouteChange={this.props.onRouteChange}
                    value='Register'
                    path='register' />
            </Form> 
        )
    }
}

export default Signin;