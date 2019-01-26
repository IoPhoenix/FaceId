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
        newName: ''
      }
    }

    onNameChange = (e) => {
        this.setState({ newName: e.target.value.trim() });
    }

    
    updateUserNameInDatabase = () => {

        // clear previous error messages:
        this.props.changeErrorMessage('');

        // send new user name to database
        const dataToSend = {
            id: this.props.user.id,
            newName: this.state.newName
        }
    
        // send new name to database:
        this.props.updateUserData(dataToSend, 'updateName');
    }


    onNameSubmit = () => {
        const oldName = this.props.user.name;
        const { newName } = this.state;

        // if user name remains the same, do not send request to database
        if (newName.toLowerCase() === oldName.toLowerCase() || !newName) {
            this.props.changeErrorMessage('Please provide new name');
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
    
    export default ChangeName;
