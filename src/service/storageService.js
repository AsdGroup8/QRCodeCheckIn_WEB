const USER_PREFIX = `user_`;
const USER_TOKEN = USER_PREFIX + "token";
const USER_INFO = USER_PREFIX + "info";

const set = (key, value) => {
    localStorage.setItem(key, value);
}

const get = (key) => localStorage.getItem(key);

export default {
    USER_INFO,
    USER_TOKEN,
    set, get,
}
