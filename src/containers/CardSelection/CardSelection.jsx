import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.css';

import { Card } from 'components/Card';

let CardSelection = props => (
  <div className="CardSelection">
    {
      props.cards.map(card => {
        return (
          <Card
            key={card.data.name}
            onClick={() => {
              props.history.push(`/${card.data.name}`);
            }}
            name={card.data.name}
            icon={card.data.icon}
            styles={card.data.styles} />
        );
      })
    }
  </div>
);

CardSelection = withRouter(CardSelection);

CardSelection = connect(
  (state) => ({
    cards: state.cards
  }),
  null
)(CardSelection);

export { CardSelection };
