import { EventEmitter } from 'events';

class Store extends EventEmitter {
    constructor (dispatcher) {
        super();
        this._list = [];
        dispatcher.register((action) => {
            switch(action.actionType){
                case 'add':
                    this._add(action.name)
                    break;
                case 'webRequest':
                    this._getAll(action.msg)
                    break;
                default:
                    this._add(action.name)
            }
        })

    }

    _add (item) {
        this._list.push(item);
        // console.log(this._list);
        this.emit('change', this.list);
    }

    _getAll (msg) {
        this.emit('message', msg);
    }

    get list () {
        return this._list;
    }
}

export default Store;