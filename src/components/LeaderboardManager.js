import React, {Component} from 'react';
import Leaderboard from './Leaderboard';
import LeaderboardStore from '../stores/leaderboardStore';
import Dispatcher from '../dispatcher/appDispatcher';

class LeaderboardManager extends Component {

    constructor() {
        super();
        this.state = {
            leaderboard: [],
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
            leaderboard: LeaderboardStore.getThirtyDay()
        });
    }

    setAllTimeLeaderboard() {
        this.setState({
            leaderboard: LeaderboardStore.getAllTime()
        });
    }

    render() {
        return (
            <Leaderboard
                leaderboard={this.state.leaderboard}
                setThirtyDay={this.setThirtyDayLeaderboard.bind(this)}
                setAllTime={this.setAllTimeLeaderboard.bind(this)}
            />
        );
    }

}

export default LeaderboardManager;
