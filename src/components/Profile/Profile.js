import React from 'react';
import './Profile.css';

const Profile = (props, {user}) => {
    const { name, email, joined, entries } = props.user;
    return (
        <div 
            className="mw7-ns center pa3 ph5-ns">
            {props.children}
           
        <h2 className="white">This is your proflle details</h2>
        <table className="center collapse ba br2 b--black-10 pv2 ph3 mt4">
            <tbody>
                <tr className="striped--near-white ">
                    <th className="pv2 ph3 tl f6 fw6 ttu">Name</th>
                    <td className="pv2 ph3">{name}</td>
                    <td className="ph3">
                        <p 
                            onClick={() => props.onRouteChange('home')}
                            className="f6 link dim ph3 pv2 dib white bg-black">
                                Change your name
                        </p>
                    </td>
                </tr>
                <tr className="striped--light-gray">
                    <th className="pv2 ph3 tl f6 fw6 ttu">Email</th>
                    <td className="pv2 ph3">{email}</td>
                    <td className="ph3">
                        <p 
                            onClick={() => props.onRouteChange('home')}
                            className="f6 link dim ph3 pv2 dib white bg-black">
                                Change your email
                        </p>
                    </td>
                </tr>
                <tr className="striped--near-white">
                    <th className="pv3 ph3 tl f6 fw6 ttu">Registered</th>
                    <td className="pv3 ph3">{joined.substr(0,10)}</td>
                    <td className="pv3 ph3"></td>
                </tr>
                <tr className="striped--light-gray">
                    <th className="pv3 ph3 tl f6 fw6 ttu">Submitted images</th>
                    <td className="pv3 ph3">{entries}</td>
                    <td className="pv3 ph3"></td>
                </tr>
            </tbody>
        </table>
        </div>
    );
}

export default Profile;