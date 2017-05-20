import React from 'react';
import './styles.css';

export const Card = (props) => (
  <div className="Card" onClick={props.onClick}>
    {props.name}
  </div>
);
