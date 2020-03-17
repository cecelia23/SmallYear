/*
    localStorage数据管理
*/
// 跨浏览器storage
import store from 'store';

const USER_KEY = 'user_key'
export default {
    setUser (user) {
        // JSON.stringify 为了以string类型存储
        // localStorage.setItem(USER_KEY, JSON.stringify(user))
        store.set(USER_KEY, user);
    },
    getUser () {
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
        return store.get(USER_KEY) || {};
    },
    removeUser () {
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY);
    }
}