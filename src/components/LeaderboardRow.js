import React, {Component} from 'react';

class LeaderboardRow extends Component {
    render() {
        let leader = this.props.leader;
        return (
            <tr key={this.props.rank + leader.username}>
                <td><div className="rank">{this.props.rank}</div></td>
                <td><img src={leader.img} className='img img-circle' /><span className="username">{leader.username}</span></td>
                <td><div className="points">{leader.recent}</div></td>
                <td><div className="points">{leader.alltime}</div></td>
            </tr>
        );
    }
}

export default LeaderboardRow;