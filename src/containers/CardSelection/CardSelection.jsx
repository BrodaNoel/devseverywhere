import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.css';

import { Card } from 'components/Card';
import * as actions from 'actions';

let CardSelection = (props) => (
  <div className="CardSelection">
    {
      props.cards.map((card) => {
        return (
          <Card
            key={card.name}
            onClick={() => {
              props.dispatch(
                actions.changeSelectedCard(card)
              );

              if (!props.user.isLogged) {
                props.history.push(`/request-access/${card.name}`);
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
  (state) => ({
    cards: state.cards,
    user: state.user
  }),
  null
)(CardSelection);

export { CardSelection };
