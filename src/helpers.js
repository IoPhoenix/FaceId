export const capitalize = (str) => {
    return str.replace(/\b\w/g, l => l.toUpperCase());
}

export const storeUserDataLocally = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(key + ' data is stored in local storage');
}

export const updateUserDataLocally = (key, target, newValue) => {
    let userData = localStorage.getItem(key);

    if (userData) {
      userData = JSON.parse(userData);
      userData[target] = newValue;
      localStorage.setItem(key, JSON.stringify(userData));
      console.log(key + ' data is updated in local storage');
    } 
}

export const removeUserDataLocally = (key) => {
    let userData = localStorage.getItem(key);

    if (userData) {
        localStorage.removeItem(key);
        console.log(key + ' data is removed from local storage');
    } 
}