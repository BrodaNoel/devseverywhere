import React, { Component } from 'react';
import './styles.css';

import { Card } from '../Card';

export class CardSelection extends Component {
  render() {
    return (
      <div className="CardSelection">
        {
          this.props.cards.map((card) => {
            return (
              <Card
                key={card.name}
                onClick={() => {this.props.onCardClick(card)}}
                name={card.name} />
            )
          })
        }
      </div>
    );
  }
};
