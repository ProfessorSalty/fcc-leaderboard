import React, {Component} from 'react';

class Header extends Component {

    render() {
        return (
            <div className="navbar navbar-default">
                <ul className="nav navbar-nav">
                    <li><a href="#">Back</a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="">Check me out on GitHub</a></li>
                </ul>
            </div>
        );
    }
}

export default Header;