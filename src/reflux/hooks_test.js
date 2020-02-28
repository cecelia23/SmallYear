const Reflux = require('reflux');

const action = Reflux.createAction({
    preEmit(data) {
        return {
            name: data
        }
    },
    shouldEmit() {
        // 若为false，则不会触发
        return true;
    }
})

action.listen(data => console.log(data));

action.trigger('flower');