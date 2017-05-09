import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { CardSelectionPage } from './pages/CardSelectionPage';
import { MapPage } from './pages/MapPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={CardSelectionPage} />
          <Route path="/request-access/:social" />
          <Route path="/:tech" component={MapPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
