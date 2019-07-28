export const capitalize = (str) => {
    return str.replace(/\b\w/g, l => l.toUpperCase());
}

export const storeUserDataLocally = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const updateUserDataLocally = (key, target, newValue) => {
    let userData = localStorage.getItem(key);

    if (userData) {
      userData = JSON.parse(userData);
      userData[target] = newValue;
      localStorage.setItem(key, JSON.stringify(userData));
    } 
}

export const removeUserDataLocally = (key) => {
    let userData = localStorage.getItem(key);

    if (userData) {
        localStorage.removeItem(key);
    } 
}