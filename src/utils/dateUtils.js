export const formatDate = (time) => {
    if(!time) { return ''}
    let oTime = new Date(time);
    return oTime.getFullYear() + '-' + oTime.getMonth() + '-' + oTime.getDate() + ' ' + oTime.getHours() + ':' + oTime.getMinutes() + ':' + oTime.getSeconds();
 }