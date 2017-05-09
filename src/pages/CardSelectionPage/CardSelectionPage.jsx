import React, { Component } from 'react';

import { CardSelection } from '../../components/CardSelection';
import './styles.css';

export class CardSelectionPage extends Component {
  // TODO: Move it to some kind of implementation
  cards = [
    { name: 'ReactJS', hashtags: ['#reactJS', '#react'] },
    { name: 'AngularJS', hashtags: ['#angularjs', '#angular'] },
    { name: 'VueJS', hashtags: ['#vuejs', '#vue'] },
    { name: 'Ember', hashtags: ['#emberjs', '#ember'] }
  ];

  // TODO: Move it to some kind of service
  isLoggedInTwitter = true;

  handleCardClick = (card) => {
    if (!this.isLoggedInTwitter) {
      this.props.history.push('/request-access/twitter');
    } else {
      this.props.history.push(`/${card.name}`);
    }
  }

  render() {
    return (
      <div className="CardSelectionPage">
        <CardSelection
          cards={this.cards}
          isLoggedInTwitter={this.isLoggedInTwitter}
          onCardClick={this.handleCardClick}>
        </CardSelection>
      </div>
    );
  }
};
