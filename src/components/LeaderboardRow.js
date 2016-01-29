import React, {Component} from 'react';

class LeaderboardRow extends Component {
    render() {
        let leader = this.props.leader;
        return (
            <tr key={this.props.rank + leader.username}>
                <td>{this.props.rank}</td>
                <td><img src={leader.img} className='img img-circle' /><span className="username">{leader.username}</span></td>
                <td>{leader.recent}</td>
                <td>{leader.alltime}</td>
            </tr>
        );
    }
}

export default LeaderboardRow;