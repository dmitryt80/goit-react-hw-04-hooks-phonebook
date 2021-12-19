export const getFromLS = (key, method = JSON.parse) => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? method(value) : [];
  } catch (error) {
    new Error("Error reading from localstorage");
  }
};

export const setInLS = (key, value, method = JSON.stringify) => {
  try {
    window.localStorage.setItem(key, method(value));
  } catch (error) {
    new Error("Error writing into localstorage");
  }
};