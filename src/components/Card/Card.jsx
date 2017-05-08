import React, { Component } from 'react';
import './styles.css';

export class Card extends Component {
  render() {
    return (
      <div className="Card">
        <span className="name">Card: {this.props.name}</span>
      </div>
    );
  }
};
