import React from 'react';
import Form from '../Form/Form';
import Legend from '../Legend/Legend';
import NameInput from '../NameInput/NameInput';
import EmailInput from '../EmailInput/EmailInput';
import SubmitInput from '../SubmitInput/SubmitInput';
import FormLink from '../FormLink/FormLink';

class ChangeProfile extends React.Component {
    constructor(props, changeEmail) {
      super(props);
      this.state = {
        newName: this.props.user.name,
        newEmail: this.props.user.email,
        message: ''
      }

      console.log('this.state.newName before change: ', this.props.user.name);
      
    }

    onNameChange = (e) => {
        this.setState({newName: e.target.value});
    }

    onEmailChange = (e) => {
        this.setState({newEmail: e.target.value});
    }

    updateUserInfo = (updateRequestName, requestBody) => {
        // clear previous error messages:
        this.setState({ message: '' });
        console.log('requestBody: ', requestBody);

        // select request type depending on which submit button was clicked
        updateRequestName = updateRequestName || 'updateEmail';

        // send new user info to database
        fetch('https://calm-forest-65718.herokuapp.com/' + updateRequestName, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then((data) => {
            // update new user info in the whole app 
            this.props.updateUserDetails(data);
            this.setState({ message: 'Your information was updated!' });
        })
        .catch(err => {
            console.log('error in updateUserName: ', err);
            this.setState({ message: 'Unable to update name' });
        });
    }

    onNameSubmit = () => {
        console.log('submit name buttons was clicked');
        console.log('newName is: ', this.state.newName);

        // if user name remains the same, do not send request to database
        if (this.state.newName === this.props.user.name) {
            this.setState({ message: 'Please provide new name' });
            return;
        }

        else if (this.state.newName !== this.props.user.name) {
            this.updateUserInfo('updateName', {
                id: this.props.user.id,
                newName: this.state.newName
            });
        }
    }

    onEmailSubmit = () => {
        console.log('email submitted');
           // if (this.state.newEmail !== this.props.user.email) {
        //     requestBody.newEmail = this.state.newEmail;
        // }
    }

    render() {
        const { name, email } = this.props.user;

        return (
            <div>
                { this.props.children }

                <Form>
                    <Legend value={'Change Credentials'} />
                    <NameInput 
                        onNameChange={this.onNameChange} 
                        name={name}
                        labelValue={'Enter new name'} />
                    <SubmitInput 
                        onSubmit={this.onNameSubmit}
                        message={this.state.message}
                        value='Submit name' />
                    <EmailInput 
                        onEmailChange={this.onEmailChange} 
                        email={email}
                        labelValue={'Enter new email'} />
                    <SubmitInput 
                        onSubmit={this.onEmailSubmit}
                        message={this.state.message}
                        value='Submit email' />
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
