import React from 'react';
import Form from '../Form/Form';
import Legend from '../Legend/Legend';
import NameInput from '../NameInput/NameInput';
import EmailInput from '../EmailInput/EmailInput';
import SubmitInput from '../SubmitInput/SubmitInput';
import FormLink from '../FormLink/FormLink';

class ChangeProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        newName: '',
        newEmail: '',
        message: ''
      }
    }

    onNameChange = (e) => {
        this.setState({newName: e.target.value});
    }

    onEmailChange = (e) => {
        this.setState({newEmail: e.target.value});
    }

    updateUserInfo = () => {
        // clear previous error messages:
        this.setState({ message: '' });

        // send new user info to database
        fetch('https://calm-forest-65718.herokuapp.com/updateProfile', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.user.id,
                newName: this.state.newName
            })
        })
        .then(response => response.json())
        .then(data => {
            // update new user info in the app
            this.props.updateUserDetails(data);
            this.setState({ message: 'Your name was updated!' });
        })
        .catch(err => {
            console.log(err);
            this.setState({ message: 'Unable to update information' });
        });
    }

    onSubmit = () => {
        if (!this.state.newName) {
            this.setState({ message: 'Please enter a new name' });
        } else if (this.state.newName === this.props.user.name) {
            this.setState({ message: 'The name remained the same' });
        } else {
            this.updateUserInfo(); 
        }
    }

    render() {
        const { name, email } = this.props.user;

        return (
            <div 
                className="w-100 center pa3 ph5-ns">
                { this.props.children }

                <Form>
                    <Legend value={'Change Credentials'} />
                    <NameInput 
                        onNameChange={this.onNameChange} 
                        name={name}
                        labelValue={'Enter new name'} />
                    <EmailInput 
                        onEmailChange={this.onEmailChange} 
                        email={email}
                        labelValue={'Enter new email'} />
                    <SubmitInput 
                        onSubmit={this.onSubmit}
                        message={this.state.message}
                        value='Sumbit' />
                    <FormLink
                        onRouteChange={this.props.onRouteChange} 
                        value='Return to profile' 
                        path='profile' />
                </Form> 
            </div>
        )
      }
    }
    
    export default ChangeProfile;
