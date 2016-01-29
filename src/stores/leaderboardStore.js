import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/ActionTypes';
import {EventEmitter} from 'events';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

let _thirtyDay = [],
    _allTime = [];

const leaderboardStore = Object.assign({}, EventEmitter.prototype, {

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    getThirtyDay: function() {
        return _thirtyDay;
    },

    getAllTime: function() {
        return _allTime;
    }
});

Dispatcher.register((action) => {
    switch(action.actionType) {
        case ActionTypes.INITIALIZE:
            _thirtyDay = action.initialData.thirtyDay;
            _allTime = action.initialData.allTime;
            leaderboardStore.emitChange();
            break;
        default:
    }
});

export default leaderboardStore;