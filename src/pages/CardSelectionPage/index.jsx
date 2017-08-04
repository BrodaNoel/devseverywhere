// @flow
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';

import CardSelection from 'containers/CardSelection';
import config from 'config';
import './styles.css';

class CardSelectionPage extends Component {
  render() {
    return (
      <DocumentTitle title={config.pageTitle}>
        <div className="CardSelectionPage">
          <CardSelection />
        </div>
      </DocumentTitle>
    );
  }
};

export default CardSelectionPage;
