import { DATABASE_LINK } from '../constants.js';

class userApi {  
    static signinUser(dataToSend) {
      return fetch(`${DATABASE_LINK}/signin`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataToSend)
    })
      .then(response => response.json())
      .catch(error => error);
    }
}

export default userApi;  