import React, { Component } from 'react';
import './styles.css';

import { Card } from '../../components/Card';

export class CardSelectionPage extends Component {
  // TODO: Move it to some kind of implementation
  cards = [
    { name: 'ReactJS', hashtags: ['#reactJS', '#react'] },
    { name: 'AngularJS', hashtags: ['#angularjs', '#angular'] },
    { name: 'VueJS', hashtags: ['#vuejs', '#vue'] },
    { name: 'PHP', hashtags: ['#php'] }
  ];

  render() {
    return (
      <div className="CardSelectionPage">
        {
          this.cards.map((card) => {
            return (
              <Card
                key={card.name}
                {...card} />
            )
          })
        }
      </div>
    );
  }
};
