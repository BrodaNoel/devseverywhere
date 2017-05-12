import React, { Component } from 'react';

import { CardSelection } from '../../components/CardSelection';
import './styles.css';

export class CardSelectionPage extends Component {
  // TODO: Remove it after Redux implementation
  cards = window.cards;
  isLoggedInTwitter = window.isLoggedInTwitter;

  onCardClick = (card) => {
    if (!this.isLoggedInTwitter) {
      this.props.history.push(`/request-access/twitter/${card.name}`);
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
          onCardClick={this.onCardClick} />
      </div>
    );
  }
};
