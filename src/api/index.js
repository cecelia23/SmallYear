import ajax from './ajax';
/*包含应用中所有接口的模块
 每个函数的返回值都是promise*/
 import jsonp from 'jsonp';
import { message } from 'antd';

//  const BASE = ''

export const reqLogin = (username, password) =>  ajax('/login', {username, password}, 'POST');

export const reqAddUser = (user = {}) => ajax('/manage/user/add', user, 'POST');

export const reqWeather = (city) => {
    return new Promise((resovle, reject) => {
        const url = `https://www.tianqiapi.com/api?version=v6&appid=18552452&appsecret=azaS5gc7&city=${city}&vue=1`;
        jsonp(url, {}, (err, data) => {
            if(!err) {
                const {wea} = data;
                resovle(wea);
            } else {
                message.error('无法获取天气信息');
            }
        })
    })
}

