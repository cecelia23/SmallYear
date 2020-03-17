import axios from 'axios';
/* 对axios进行封装，
返回promise对象
优化：1. 统一处理异常信息==>通过在外层使用promise封装
2. 优化resolve()返回的数据 res.data
 */
import { message } from 'antd';

export default function ajax(url, data = {}, method = 'GET') {
    return new Promise((resolve, reject) => {
        // 1. 执行ajax请求
        let promise;
        if (method === 'GET') {
            //发送GET请求
            promise = axios.get(url, {
                params: data
            });
        } else {
            // 发送POST请求
            promise = axios.post(url, data);
        }
        // 成功，调用resolve()向外层传递; 失败，不调用reject(), 而是在该函数内部解决error
        promise.then(res => {
            resolve(res.data);
        }).catch((err) => {
            message.error('请求出错了', err.message);
        })
    })
    
}