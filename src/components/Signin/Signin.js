import React from 'react';
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
        return (
            <Form>
                <Legend value={'Sign In'} />
                <EmailInput onEmailChange={this.onEmailChange} />
                <PasswordInput onPasswordChange={this.onPasswordChange} />
                <SubmitInput 
                    onSubmit={this.onSubmit}
                    signInError={this.state.signInError}
                    value='Sign in' />
                <FormLink onRouteChange={this.props.onRouteChange} value='Register'/>
            </Form> 
        );
    }
}

export default Signin;