import React from 'react';
import Form from '../Form/Form';
import Legend from '../Legend/Legend';
import EmailInput from '../EmailInput/EmailInput';
import SubmitInput from '../SubmitInput/SubmitInput';
import FormLink from '../FormLink/FormLink';

class ChangeEmail extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        newEmail: ''
      }
    }


    onEmailChange = (e) => {
        this.setState({ newEmail: e.target.value.trim() });
    }

    
    updateUserEmailInDatabase = () => {
        // clear previous error messages:
        this.props.changeErrorMessage('');

        // send new user name to database
        const dataToSend = {
            id: this.props.user.id,
            oldEmail: this.props.user.email,
            newEmail: this.state.newEmail
        }

        // send new email to database:
        this.props.updateUserData(dataToSend, 'updateEmail');
    }


    onEmailSubmit = () => {
        const oldEmail = this.props.user.email;
        const { newEmail } = this.state;

        // if user email remains the same, do not send request to database
        if (newEmail === oldEmail || !newEmail) {
             this.props.changeErrorMessage('Please provide new email');
            return;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
             this.props.changeErrorMessage('Invalid email format');
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
                        message={this.props.user.message}
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
