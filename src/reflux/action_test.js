const Reflux = require('reflux');

const action = Reflux.createAction();
action.listen(data => console.log('data1 is ', data));
action.listen(data => console.log('data2 is ', data));
// 同步触发
action.trigger('sync');
// 异步触发
// setTimeout(() => {
//     action.trigger('async')
// }, 0);

action.triggerAsync('async2')

console.log('-----end-----');