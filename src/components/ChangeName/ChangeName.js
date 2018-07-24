import React from 'react';
import Form from '../Form/Form';
import Legend from '../Legend/Legend';
import NameInput from '../NameInput/NameInput';
import SubmitInput from '../SubmitInput/SubmitInput';
import FormLink from '../FormLink/FormLink';

class ChangeName extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        newName: this.props.user.name,
        message: ''
      }
    }

    onNameChange = (e) => {
        this.setState({ newName: e.target.value.trim() });
    }

    
    updateUserNameInDatabase = () => {
        // clear previous error messages:
        this.setState({ message: '' });

        const { newName } = this.state;

        // send new user name to database
        fetch('https://calm-forest-65718.herokuapp.com/updateName', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.user.id,
                newName: newName
            })
        })
        .then(response => response.json())
        .then((response) => {
            if (response === 'success') {
                // update new user info in the whole app 
                this.props.updateUserName(newName);     
                this.setState({ message: 'Your information was updated!' });
            } else {
                this.setState({ message: 'Failed to update name' });
            }
        })
        .catch(err => {
            console.log('error in updateUserName: ', err);
        });
    }


    onNameSubmit = () => {
        // if user name remains the same, do not send request to database
        if (this.state.newName === this.props.user.name) {
            this.setState({ message: 'Please provide new name' });
            return;
        } else {
            this.updateUserNameInDatabase();
        }
    }

    render() {
        return (
            <div>
                { this.props.children }

                <Form>
                    <Legend value={'Change Name'} />
                    <NameInput 
                        onNameChange={this.onNameChange} 
                        name={this.props.user.name}
                        labelValue={'Enter new name'} />
                    <SubmitInput 
                        onSubmit={this.onNameSubmit}
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
    
    export default ChangeName;
