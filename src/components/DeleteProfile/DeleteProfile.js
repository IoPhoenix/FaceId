import React from 'react';
import Form from '../Form/Form';
import Legend from '../Legend/Legend';
import SubmitInput from '../SubmitInput/SubmitInput';
import FormLink from '../FormLink/FormLink';


const DeleteProfile = (props) => {

    const deleteProfile = () => {

        const dataToSend = {
            id: props.user.id,
            email: props.user.email
        }

         // send user details to database:
         props.deleteUserData(dataToSend);
    }

    return (
        <div>
            { props.children }

            <Form>
                <Legend value={'Delete Profile'} />
                <p className='black'>Are you sure you want to delete your profile? All data will be lost.</p>
                <SubmitInput 
                    onSubmit={deleteProfile}
                    value='YES'
                    message={props.user.message}
                    customClass='bg-dark-red white' />
                <FormLink
                    onRouteChange={props.onRouteChange} 
                    value='No, return to profile' 
                    path='profile' />
            </Form> 
        </div>
        )
    }
    
    export default DeleteProfile;
