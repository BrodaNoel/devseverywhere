import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.css';

import { Card } from 'components/Card';

let CardSelection = (props) => (
  <div className="CardSelection">
    {
      props.cards.map((card) => {
        return (
          <Card
            key={card.name}
            onClick={() => {
              window.selectedCard = card;

              if (!window.isLoggedInTwitter) {
                props.history.push(`/request-access/twitter/${card.name}`);
              } else {
                props.history.push(`/${card.name}`);
              }
            }}
            name={card.name}
            icon={card.icon}
            styles={card.styles} />
        );
      })
    }
  </div>
);

CardSelection = withRouter(CardSelection);

CardSelection = connect(
  (state) => ({cards: state.cards}),
  null
)(CardSelection);

export { CardSelection };
