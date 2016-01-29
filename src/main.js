import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import LeaderboardActions from './actions/LeaderboardActions';

LeaderboardActions.initApp();

ReactDOM.render(<App />, document.getElementById('app'));