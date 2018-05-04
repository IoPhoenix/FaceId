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
        changeName: '',
        changeEmail: '',
        error: ''
      }
      console.log('Change profile props: ', props);
    }

    onNameChange = (e) => {
        this.setState({changeName: e.target.value});
    }

    onEmailChange = (e) => {
        this.setState({changeEmail: e.target.value});
    }

    updateUserInfo = () => {
        // send post request to database
        // update name/email of user through this.props.loadUser(userData);
        // if success: show success message & sign user out if email changed?
        // if fail: show error message
    }

    onSubmit = () => {
        // check user input for correctness
        this.updateUserInfo(); 
    }

    render() {
        return (
            <div 
                className="w-100 center pa3 ph5-ns">
                { this.props.children }

                <Form>
                    <Legend value={'Change Credentials'} />
                    <NameInput onNameChange={this.onNameChange} />
                    <EmailInput onEmailChange={this.onEmailChange} />
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
