const Reflux = require('reflux');

const actions = Reflux.createActions(['action1', 'action2']);

actions.action1.listen(data => console.log('in action1, ', data));
actions.action2.listen(data => console.log('in action2, ', data));
actions.action1.listen(data => console.log('in action1, ', data));


actions.action1.trigger('heel');
actions.action2.triggerAsync('mount');
