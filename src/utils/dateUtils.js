export const formatDate = (time) => {
    if(!time) { return ''}
    let oTime = new Date(time);
    return oTime.getFullYear() + '-' + oTime.getMonth() + '-' + oTime.getDate() + ' ' + oTime.getHours() + ':' + oTime.getMinutes() + ':' + oTime.getSeconds();
 }

 export const toSQLDate = (time) => {
    if(!time) { return ''}
    let oTime = new Date(time);
    let date = [oTime.getFullYear(), oTime.getMonth() + 1, oTime.getDate(), oTime.getHours(), oTime.getMinutes(), oTime.getSeconds()];
    var result = '';
    for (let i in date) {
        let item = String(date[i]);
        if(item.length < 2) {
            item = '0' + item;
        }
        result += item;
    }
    return result;
 }