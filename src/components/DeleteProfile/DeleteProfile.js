import React from 'react';
import {DATABASE_LINK} from '../../constants.js';
import Form from '../Form/Form';
import Legend from '../Legend/Legend';
import SubmitInput from '../SubmitInput/SubmitInput';
import FormLink from '../FormLink/FormLink';

class DeleteProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        message: ''
      }
    }

    deleteProfile = () => {
         // clear previous error messages:
         this.setState({ message: '' });

        const { id, email } = this.props.user;

        // send request to the server
        fetch(`${DATABASE_LINK}/profile/delete`, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id,
                email: email
            })
        })
        .then(response => response.json())
        .then((response) => {
            console.log('From deleteProfile response is: ', response);
            if (response === 'success') {
                // remove user data in the whole app
                this.props.deleteAllUserData();     
            } else {
                this.setState({ message: 'Failed to delete profile' });
            }
        })
        .catch(err => {
            console.log('error in deleteProfile: ', err);
        });
    }

    render() {
        return (
            <div>
                { this.props.children }

                <Form>
                    <Legend value={'Delete Profile'} />
                    <p className='black'>Are you sure you want to delete your profile? All data will be lost.</p>
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