
import React from 'react';
import './Profile.css';

const Profile = (props) => {
    const { name, email, joined, entries } = props.user;
    
    return (
        <div 
            className="mw7-ns center pa3-ns ph5-ns">
            {props.children}
           
        <h2 className="white">{name}'s Profile</h2>


        <table className="center collapse b--black-10 pv2 ph3 mt4">
            <tbody>
                <tr className="bg-near-white">
                    <th className="pv2 ph3 tl f6 fw6 ttu">Name</th>
                    <td className="pv2 ph3">{name}</td>
                    <td className="pv2 ph3">
                        <p
                            onClick={() => props.onRouteChange('changeName')}
                            className="pointer center f6 link grow ph4 pv2 dib white bg-black">
                                Change name
                        </p>
                    </td>
                </tr>
                <tr className="bg-moon-gray">
                    <th className="pv2 ph3 tl f6 fw6 ttu">Email</th>
                    <td className="pv2 ph3">{email}</td>
                    <td className="pv2 ph3">
                        <p
                            onClick={() => props.onRouteChange('changeEmail')}
                            className="pointer center f6 link grow ph4 pv2 dib white bg-black">
                                Change email
                        </p>
                    </td>
                </tr>
                <tr className="bg-near-white">
                    <th className="pv3 ph3 tl f6 fw6 ttu">Registered</th>
                    <td className="pv3 ph3">{joined.substr(0,10)}</td>
                    <td className="pv3 ph3"></td>
                </tr>
                <tr className="bg-moon-gray">
                    <th className="pv3 ph3 tl f6 fw6 ttu">Submitted images</th>
                    <td className="pv3 ph3">{entries}</td>
                    <td className="pv3 ph3"></td>
                </tr>
                <tr className="">
                    <th className="pv3 ph3 tl f6 fw6 ttu"></th>
                    <td className="pv3 ph3"></td>
                    <td className="pv2 ph3 bg-near-white">
                        <p
                            onClick={() => props.onRouteChange('deleteProfile')}
                            className="pointer center f6 link grow ph4 pv2 dib white bg-dark-red">
                                Delete profile
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    );
}

export default Profile;