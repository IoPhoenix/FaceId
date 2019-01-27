import { DATABASE_LINK } from '../constants.js';

class deleteDataApi {  
    static deleteUserData(dataToSend) {
      return fetch(`${DATABASE_LINK}/profile/delete`, {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataToSend)
    })
      .then(response => response.json())
      .catch(error => error);
    }
}

export default deleteDataApi;
