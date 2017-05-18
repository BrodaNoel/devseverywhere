import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import cookies from 'js-cookie';

import { CardSelectionPage } from './pages/CardSelectionPage';
import { RequestAccessPage } from './pages/RequestAccessPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

document.title = 'DevsEverywhere!';

// TODO: These globals vars will be removed after implementing Redux. Sorry!
window.cards = [
  { name: 'ReactJS', hashtags: ['#reactJS', '#react'] },
  { name: 'AngularJS', hashtags: ['#angularjs', '#angular'] },
  { name: 'VueJS', hashtags: ['#vuejs', '#vue'] },
  { name: 'EmberJS', hashtags: ['#emberjs', '#ember'] }
];
// Firebase data
window.credentials = cookies.getJSON('credentials') || null;
window.isLoggedInTwitter = window.credentials !== null;
window.user = null;
window.selectedCard = null;

class App extends Component {
  constructor(props) {
    super(props);

    // Init
    window.cards.forEach((card) => {
      card.tweets = [];
      card.isDone = false;
      card.nextMax = null;
    });
  }
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={CardSelectionPage} />
          <Route exact path="/request-access/:social/:tech" component={RequestAccessPage} />
          <Route exact path="/:tech" component={AnalyticsPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
