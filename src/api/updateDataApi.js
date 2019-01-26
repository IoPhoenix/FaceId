import { DATABASE_LINK } from '../constants.js';

class updateDataApi {  
    static updateUserData(dataToSend, action) {
      return fetch(`${DATABASE_LINK}/${action}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataToSend)
    })
      .then(response => response.json())
      .catch(error => error);
    }
}

export default updateDataApi;