export const readFromLocalStorage = name => {
    if (window.localStorage) {
        return localStorage.getItem(name);
    }
};
export const saveDataToLocalStorage = (name, value) => {
    if (window.localStorage) {
        localStorage.setItem(name, value);
    }
};
