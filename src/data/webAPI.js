module.exports = {
    getAll (func){
        setTimeout(() => {
            func(['aaa','111','bbb','222']);  // 这里的数组数据可以是从后端数据库中取出的
        }, 2000);
    }
}