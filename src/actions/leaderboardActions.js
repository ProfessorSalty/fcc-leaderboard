import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/ActionTypes';
import $ from 'jquery';

const ALLTIME = 'http://fcctop100.herokuapp.com/api/fccusers/top/alltime',
    THIRTYDAY = 'http://fcctop100.herokuapp.com/api/fccusers/top/recent';
const leaderboardActions = {
    getLeaderboard: (url) => {
        return $.get(url);
    },
    initApp: function() {
        $.when(this.getLeaderboard(ALLTIME), this.getLeaderboard(THIRTYDAY))
        .then((allTime, thirtyDay) => {
            let payload = {
                actionType: ActionTypes.INITIALIZE,
                initialData: {
                    allTime: allTime[0],
                    thirtyDay: thirtyDay[0]
                }
            };
            Dispatcher.dispatch(payload);
        });
    }
};

export default leaderboardActions;