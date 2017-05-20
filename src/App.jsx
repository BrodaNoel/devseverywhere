import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import cookies from 'js-cookie';

import { CardSelectionPage } from './pages/CardSelectionPage';
import { RequestAccessPage } from './pages/RequestAccessPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { withGA } from './HOCs/withGA';

import { icons } from './implementation/img';

// TODO: These globals vars will be removed after implementing Redux. Sorry!
window.cards = [
  {
    name: 'ReactJS',
    hashtags: ['#reactJS', '#react'],
    icon: icons.reactjs,
    styles: { backgroundColor: '#222', color: '#484848' }
  },
  {
    name: 'AngularJS',
    hashtags: ['#angularjs', '#angular'],
    icon: icons.angularjs,
    styles: { backgroundColor: '#263238', color: '#000' }
  },
  {
    name: 'VueJS',
    hashtags: ['#vuejs', '#vue'],
    icon: icons.vuejs,
    styles: { backgroundColor: '#FFF', color: '#2C3E50' }
  },
  {
    name: 'EmberJS',
    hashtags: ['#emberjs', '#ember'],
    icon: icons.emberjs,
    styles: { backgroundColor: '#F8EFEC', color: '#141413' }
  }
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
          <Route exact path="/" component={withGA(CardSelectionPage)} />
          <Route exact path="/request-access/:social/:tech" component={withGA(RequestAccessPage)} />
          <Route exact path="/:tech" component={withGA(AnalyticsPage)}/>
        </div>
      </Router>
    );
  }
}

export default App;
