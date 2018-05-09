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
        newName: this.props.user.name,
        newEmail: this.props.user.email,
        message: ''
      }

      console.log('initial newName and newEmail: ', this.state.newName, this.state.newEmail);
      console.log('original props name and email: ',  this.props.user.name,  this.props.user.email);
    }

    onNameChange = (e) => {
        this.setState({newName: e.target.value});
    }

    onEmailChange = (e) => {
        this.setState({newEmail: e.target.value});
    }

    updateUserInfo = (requestBody) => {
        // clear previous error messages:
        this.setState({ message: '' });

        console.log('requestBody: ', requestBody);

        // send new user info to database
        fetch('https://calm-forest-65718.herokuapp.com/updateProfile', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then((data) => {
            // update new user info in the agit bpp
            this.props.updateUserDetails(data);
            this.setState({ message: 'Your information was updated!' });
        })
        .catch(err => {
            console.log('error in updateUserInfo: ', err);
            this.setState({ message: 'Unable to update information' });
        });
    }

    onSubmit = () => {
        // if name was not changed, check email
        // if both fields remain the same, do not update info
        // if at least one was changed, update info

        let requestBody = {
            id: this.props.user.id
        };

        // if user info remains the same, do not send request to database
        if (this.state.newEmail === this.props.user.email 
            && this.state.newName === this.props.user.name) {
                this.setState({ message: 'Please provide new details' });
                return;
        }

        if (this.state.newName !== this.props.user.name) {
            requestBody.newName = this.state.newName;   
        }

        if (this.state.newEmail !== this.props.user.email) {
            requestBody.newEmail = this.state.newEmail;
        }

        this.updateUserInfo(requestBody); 
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
                    <EmailInput 
                        onEmailChange={this.onEmailChange} 
                        email={email}
                        labelValue={'Enter new email'} />
                    <SubmitInput 
                        onSubmit={this.onSubmit}
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
    
    export default ChangeProfile;
