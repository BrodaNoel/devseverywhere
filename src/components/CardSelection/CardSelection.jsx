import React from 'react';
import './styles.css';

import { Card } from '../Card';

export const CardSelection = (props) => (
  <div className="CardSelection">
    {
      props.cards.map((card) => {
        return (
          <Card
            key={card.name}
            onClick={() => {props.onCardClick(card)}}
            name={card.name} />
        );
      })
    }
  </div>
);
