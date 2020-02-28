const Reflux = require('reflux');

const action = Reflux.createAction({asyncResult: true, children:['clickme']});

action.completed.listen(function() {
    console.log('complete');
})

action.clickme.listen(function() {
    console.log('click me');
    action.completed();
});

action.listen(function(data) {
    console.log(data);
    action.clickme();
});

action.trigger('hello')