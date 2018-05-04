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
        error: ''
      }
      console.log('change profile props: ', props);
    }

    onNameChange = (e) => {
        this.setState({newName: e.target.value});
        console.log(this.state);
    }

    onEmailChange = (e) => {
        this.setState({newEmail: e.target.value});
    }

    updateUserInfo = () => {
        // send post request to database
        // update name/email of user through this.props.loadUser(userData);
        // if success: show success message & sign user out if email changed?
        // if fail: show error message
        fetch('https://calm-forest-65718.herokuapp.com/changeProfile', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.user.id,
                newName: this.state.newName
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Name was successfully changed: ', data);
            this.props.updateUserDetails(data);
        })
        .catch(console.log);
    }

    onSubmit = () => {
        // check user input for correctness
        this.updateUserInfo(); 
    }

    render() {
        const { name, email } = this.props.user;
        console.log('Change profile: ', name, email);

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
                        labelValue={'Enter new email'} /> />
                    <SubmitInput 
                        onSubmit={this.onSubmit}
                        error={this.state.error}
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
