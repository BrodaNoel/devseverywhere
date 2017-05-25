import React from 'react';
import { connect } from 'react-redux';
import './styles.css';

import { Card } from 'components/Card';

let CardSelection = (props) => (
  <div className="CardSelection">
    {
      props.cards.map((card) => {
        return (
          <Card
            key={card.name}
            onClick={() => {props.onCardClick(card)}}
            name={card.name}
            icon={card.icon}
            styles={card.styles} />
        );
      })
    }
  </div>
);

CardSelection = connect(
  (state) => ({cards: state.cards}),
  null
)(CardSelection);

export { CardSelection };
