import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { CardSelectionPage } from './pages/CardSelectionPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="router">
          <Route exact path="/" component={ CardSelectionPage } />
          <Route path="/request-access/:social" />
          <Route path="/:tech" />
        </div>
      </Router>
    );
  }
}

export default App;
