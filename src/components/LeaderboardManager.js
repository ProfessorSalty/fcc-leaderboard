import React, {Component} from 'react';
import Leaderboard from './Leaderboard';
import LeaderboardStore from '../stores/leaderboardStore';
import Dispatcher from '../dispatcher/appDispatcher';

class LeaderboardManager extends Component {

    constructor() {
        super();
        this.state = {
            leaderboard: [],
            sortedBy: ''
        };
    }

    _onChange() {
        this.setThirtyDayLeaderboard();
    }

    componentWillMount() {
        LeaderboardStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        LeaderboardStore.removeChangeListener(this._onChange.bind(this));
    }

    setThirtyDayLeaderboard() {
        this.setState({
            leaderboard: LeaderboardStore.getThirtyDay(),
            sortedBy: 'thirtyDay'
        });
    }

    setAllTimeLeaderboard() {
        this.setState({
            leaderboard: LeaderboardStore.getAllTime(),
            sortedBy: 'allTime'
        });
    }

    render() {
        return (
            <Leaderboard
                leaderboard={this.state.leaderboard}
                setThirtyDay={this.setThirtyDayLeaderboard.bind(this)}
                setAllTime={this.setAllTimeLeaderboard.bind(this)}
                sortedBy={this.state.sortedBy}
            />
        );
    }

}

export default LeaderboardManager;
