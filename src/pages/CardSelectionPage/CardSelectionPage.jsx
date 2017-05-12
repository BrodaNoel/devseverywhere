import React, { Component } from 'react';

import { CardSelection } from '../../components/CardSelection';
import './styles.css';

export class CardSelectionPage extends Component {
  onCardClick = (card) => {
    if (!window.isLoggedInTwitter) {
      this.props.history.push(`/request-access/twitter/${card.name}`);
    } else {
      window.selectedCard = card;
      this.props.history.push(`/${card.name}`);
    }
  }

  render() {
    return (
      <div className="CardSelectionPage">
        <CardSelection
          cards={window.cards}
          isLoggedInTwitter={window.isLoggedInTwitter}
          onCardClick={this.onCardClick} />
      </div>
    );
  }
};
