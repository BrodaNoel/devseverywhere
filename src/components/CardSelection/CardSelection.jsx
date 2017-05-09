import React, { Component } from 'react';
import './styles.css';

import { Card } from '../Card';

export class CardSelection extends Component {
  render() {
    return (
      <div className="CardSelectionPage">
        {
          this.props.cards.map((card) => {
            return (
              <Card
                key={card.name}
                onClick={() => {this.props.handleCardClick(card)}}
                {...card} />
            )
          })
        }
      </div>
    );
  }
};
