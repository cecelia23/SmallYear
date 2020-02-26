import dispatcher from './dispatcher';
import webAPI from './webAPI';
class Action {
    // constructor () {
    //     super();
    // }
    add (name) {
        let action = {
            'actionType': 'add',
            name
        }
        dispatcher.dispatch(action);
    }
    getAll () {
        webAPI.getAll((data) => {
            const action = {
                'actionType': 'webRequest',
                'msg': data
            }
            dispatcher.dispatch(action)
        })
    }
}

export default Action;