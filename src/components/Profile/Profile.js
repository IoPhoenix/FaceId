import React from 'react';
import './Profile.css';

const Profile = ({user}) => {
    console.log(user);
    const { name, email, joined } = user;

  return (
    <div 
        className="mw5 mw6-ns center pa3 ph5-ns"
        style={{flexDirection: "column"}}>
      <h2 className="white">This is your proflle details</h2>
      <table class="collapse ba br2 b--black-10 pv2 ph3 mt4">
        <tbody>
            <tr class="striped--near-white ">
                <th class="pv2 ph3 tl f6 fw6 ttu">Name</th>
                <td class="pv2 ph3">{name}</td>
            </tr>
            <tr class="striped--light-gray">
                <th class="pv2 ph3 tl f6 fw6 ttu">Email</th>
                <td class="pv2 ph3">{email}</td>
            </tr>
            <tr class="striped--near-white ">
                <th class="pv2 ph3 tl f6 fw6 ttu">Registered</th>
                <td class="pv2 ph3">{joined.substr(0,10)}</td>
            </tr>
        </tbody>
    </table>
    </div>
  );
}

export default Profile;