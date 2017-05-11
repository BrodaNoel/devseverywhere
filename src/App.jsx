import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { CardSelectionPage } from './pages/CardSelectionPage';
import { RequestAccessPage } from './pages/RequestAccessPage';
import { MapPage } from './pages/MapPage';

document.title = 'DevsEverywhere!';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={CardSelectionPage} />
          <Route exact path="/request-access/:social/:tech" component={RequestAccessPage} />
          <Route exact path="/:tech" component={MapPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
