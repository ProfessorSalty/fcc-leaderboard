import React, {Component, PropTypes} from 'react';
import LeaderboardRow from './LeaderboardRow';

class Leaderboard extends Component {
    
    static propTypes = {
        leaderboard: PropTypes.array.isRequired,
        setThirtyDay: PropTypes.func.isRequired,
        setAllTime: PropTypes.func.isRequired
    };

    makeLeaderboardRow = (leader, index) => {
        return (
            <LeaderboardRow leader={leader} 
                            rank={index + 1}
            />
        );
    };
    
    render() {
        return (
            <div className="container">
                <div className="table-responsive">
                    <table className="table table-bordered table-condensed table-striped">
                        <thead>
                            <tr>
                                <th><div>Rank</div></th>
                                <th><div>Name</div></th>
                                <th className="clickable"><div onClick={this.props.setThirtyDay}>Points in the Last 30 Days</div></th>
                                <th className="clickable"><div onClick={this.props.setAllTime}>All time points</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.leaderboard.map(this.makeLeaderboardRow)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Leaderboard;
