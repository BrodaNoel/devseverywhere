import React, { Component } from 'react';
import './styles.css';

export class Card extends Component {
  render() {
    return (
      <div className="Card" onClick={this.props.onClick}>
        {this.props.name}
      </div>
    );
  }
};
