import ajax from './ajax';
/*包含应用中所有接口的模块
 每个函数的返回值都是promise*/
 import jsonp from 'jsonp';
import { message } from 'antd';

//  const BASE = ''

export const reqLogin = (username, password) =>  ajax('/login', {username, password}, 'POST');

// 获取一级/二级分类列表
export const reqCategorys = (parentId = 0) => ajax('/manage/category/list', {parentId});
// 添加分类
export const reqAddCategoty = (categoryName, parentId) => ajax('/manage/category/add', {categoryName, parentId},'POST');
// 更新分类
export const reqUpdateCategoty = ({categoryName, categoryId}) => ajax('/manage/category/update',{categoryName, categoryId}, 'POST');
// 查找分类
export const reqCategoryInfo = (categoryId) => ajax('/manage/category/info', {categoryId});
// 获取商品分类列表
export const reqProduct = (pageNum, pageSize) => ajax('/manage/products/list', {pageNum, pageSize})
// 搜索商品
export const reqSearchProducts = (pageNum, pageSize, searchType, value) => ajax('/manage/products/search', {pageNum, pageSize, [searchType]:value});
// 更新商品（上/下架）
export const reqUpdateProductStatus = (productId, status) => ajax('/manage/products/updateStatus', {productId, status}, 'POST');
// 上传图片?

// 删除图片
export const reqDeletePicture = (name) => ajax('/manage/imgs/delete', {name}, "POST");
// 添加/更新商品
export const reqAddProduct = (isUpdate, _id, name, sc, price, categoryId, pcategoryId, imgs, detail) => ajax('/manage/product/addUpdate', {isUpdate, _id, name, sc, price, categoryId,pcategoryId, imgs, detail}, 'POST');

// 获取角色
export const reqRoles = () => ajax('/manage/roles/list');
// 添加角色
export const reqRoleAdd = (name) => ajax('/manage/role/add', {name}, 'POST');
// 更新角色权限
export const reqRoleUpdate = (role) => ajax('/manage/role/update', role, 'POST');

// 获取用户列表
export const reqUsers = () => ajax('/manage/users/list');
// 删除用户
export const reqDeleteUser = (userId) => ajax('/manage/users/delete', {userId}, 'POST');
// 添加/更新用户
export const reqAddUpdateUser = (isUpdate, user = {}) => ajax('/manage/users/addupdate', {isUpdate, user}, 'POST');

// 获取天气信息
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

