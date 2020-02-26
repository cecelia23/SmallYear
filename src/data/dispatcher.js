// 解耦合
const dispatcher = {
    callbackList: [],
    register (callback) {
        this.callbackList.push(callback)
    },
    dispatch (action) {
        this.callbackList.forEach(callback => {
            callback(action);
        })
    }
}

export default dispatcher;