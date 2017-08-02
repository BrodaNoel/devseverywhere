// TODO: Add Flow in this file it after fix: https://github.com/facebook/flow/issues/235
import React from 'react';
import { withRouter } from 'react-router-dom';
import './styles.css';

import Card from 'components/Card';
import config from 'config';

let CardSelection = ({ cards, history }) => (
  <div className="CardSelection">
    {
      cards.map(card => {
        return (
          <Card
            key={card.name}
            onClick={() => {
              history.push(`/${card.name}`);
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
