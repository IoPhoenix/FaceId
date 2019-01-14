import { DATABASE_LINK } from '../constants.js';

class userApi {  
    static sendUserData(dataToSend, action) {
      return fetch(`${DATABASE_LINK}/${action}`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataToSend)
    })
      .then(response => response.json())
      .catch(error => error);
    }
}

export default userApi;  