import React from 'react';
import {DATABASE_LINK} from '../../constants.js';
import Form from '../Form/Form';
import Legend from '../Legend/Legend';
import NameInput from '../NameInput/NameInput';
import SubmitInput from '../SubmitInput/SubmitInput';
import FormLink from '../FormLink/FormLink';

class DeleteProfile extends React.Component {
    constructor(props) {
      super(props);
    }

    deleteProfile = () => {
        console.log('This button is working');

        // send request to the server
        fetch(`${DATABASE_LINK}/delete/`, {
        //     method: 'delete',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         id: this.props.user.id,
        //         email: email
        //     })
        // })
        // .then(response => response.json())
        // .then((response) => {
        //     if (response === 'success') {
        //         // update new user info in the whole app 
        //         this.props.updateUserName(newName);     
        //         this.setState({ message: 'Your information was updated!' });
        //     } else {
        //         this.setState({ message: 'Failed to update name' });
        //     }
        // })
        // .catch(err => {
        //     console.log('error in updateUserName: ', err);
        // });
    }

    render() {
        return (
            <div>
                { this.props.children }

                <Form>
                    <Legend value={'Delete Profile'} />
                    <p className='black'>Are you sure you want to delete your profile?</p>
                    <SubmitInput 
                        onSubmit={this.deleteProfile}
                        value='YES'
                        customClass='bg-dark-red white' />
                    <FormLink
                        onRouteChange={this.props.onRouteChange} 
                        value='No, return to profile' 
                        path='profile' />
                </Form> 
            </div>
            )
        }
    }
    
    export default DeleteProfile;
