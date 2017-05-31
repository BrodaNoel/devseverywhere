import React, { Component } from 'react';

import { CardSelection } from 'containers/CardSelection';
import './styles.css';

export class CardSelectionPage extends Component {
  render() {
    return (
      <div className="CardSelectionPage">
        <CardSelection />
      </div>
    );
  }
};
