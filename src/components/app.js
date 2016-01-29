import React, {Component} from 'react';
import Header from './header';
import LeaderboardManager from './LeaderboardManager';
import $ from 'jquery';
import jQuery from 'jquery';

class App extends Component {
    
    render() {
        return (
            <div>
                <Header />
                <LeaderboardManager />
            </div>
        );
    }
}

export default App;