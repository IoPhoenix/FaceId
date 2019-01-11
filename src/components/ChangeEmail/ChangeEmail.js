import React from 'react';
import {DATABASE_LINK} from '../../constants.js';
import Form from '../Form/Form';
import Legend from '../Legend/Legend';
import EmailInput from '../EmailInput/EmailInput';
import SubmitInput from '../SubmitInput/SubmitInput';
import FormLink from '../FormLink/FormLink';

class ChangeEmail extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        newEmail: '',
        message: ''
      }
    }


    onEmailChange = (e) => {
        this.setState({ newEmail: e.target.value.trim() });
    }

    
    updateUserEmailInDatabase = () => {
        // clear previous error messages:
        this.setState({ message: '' });

        const { newEmail } = this.state;

        // send new user email to database
        fetch(`${DATABASE_LINK}/updateEmail`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.user.id,
                oldEmail: this.props.user.email,
                newEmail: newEmail
            })
        })
        .then(response => response.json())
        .then((response) => {
            if (response === 'success') {
                // update new user info in the whole app 
                this.props.updateUserInfo('email', newEmail);  
                   
                this.setState({ message: 'Your information was updated!' });
            } else {
                this.setState({ message: 'Unable to update email' });
            }
        })
        .catch(err => {
            console.log('error in updateUserEmail: ', err);
            this.setState({ message: 'Something went wrong. Please try again later.' });
        });
    }


    onEmailSubmit = () => {
        const oldEmail = this.props.user.email;
        const { newEmail } = this.state;

        // if user email remains the same, do not send request to database
        if (newEmail === oldEmail || !newEmail) {
            this.setState({ message: 'Please provide new email' });
            return;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
            this.setState({ message: 'Invalid email format' });
            return;
        } else {
            this.updateUserEmailInDatabase();
        }
    }

    render() {
        return (
            <div>
                { this.props.children }

                <Form>
                    <Legend value={'Change Email'} />
                    <EmailInput 
                        onEmailChange={this.onEmailChange} 
                        email={this.props.user.email}
                        labelValue={'Enter new email'} />
                    <SubmitInput 
                        onSubmit={this.onEmailSubmit}
                        message={this.state.message}
                        value='Submit' />
                    <FormLink
                        onRouteChange={this.props.onRouteChange} 
                        value='Return to profile' 
                        path='profile' />
                </Form> 
            </div>
        )
      }
    }
    
    export default ChangeEmail;
