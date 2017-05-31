import React from 'react';
import { withRouter } from 'react-router-dom';
import './styles.css';

import Card from 'components/Card';
import config from 'config';

let CardSelection = props => (
  <div className="CardSelection">
    {
      props.cards.map(card => {
        return (
          <Card
            key={card.name}
            onClick={() => {
              props.history.push(`/${card.name}`);
            }}
            name={card.name}
            icon={card.icon}
            styles={card.styles} />
        );
      })
    }
  </div>
);

CardSelection.defaultProps = {
  cards: config.cards
}

CardSelection = withRouter(CardSelection);

export default CardSelection;
