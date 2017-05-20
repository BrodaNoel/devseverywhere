import React from 'react';
import './styles.css';

export const Card = (props) => (
  <div className="Card" onClick={props.onClick} style={props.styles}>
    {props.name}
    <div className="icon" style={{backgroundImage: `url(${props.icon})`}}></div>
  </div>
);
