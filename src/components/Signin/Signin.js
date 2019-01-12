import React from 'react';
import {DATABASE_LINK} from '../../constants.js';
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
          signInPassword: '',
          message: ''
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

        // clear error messages:
        this.setState({ error: '' });

        // clear previously submitted images
        this.props.resetImageData();

        fetch(`${DATABASE_LINK}/signin`, {
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
                this.props.loadUserData(user);
                this.props.onRouteChange('home');
            } else {
                this.setState({message: 'Sign in failed'});
            }
        })
        .catch(err => {
            console.log('Error in signinUser is: ', err);
            this.setState({message: 'Error signing in. Please try again later.'})
        })
        .finally(() => loader.style.visibility = 'hidden');
    }


    onSubmit = () => {
        const { signInEmail, signInPassword } = this.state;

        if (!signInEmail || !signInPassword || signInPassword.length < 8) {
            this.setState({ message: 'Invalid credentials' });
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInEmail)) {
            this.setState({ message: 'Invalid email format' });
        } else {
            // clear previous error messages
            this.setState({ message: '' });
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
                    message={this.state.message}
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