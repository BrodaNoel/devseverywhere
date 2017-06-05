import React from 'react';
import './styles.css';

const Card = ({ name, icon, onClick, styles }) => (
  <div className="Card" onClick={onClick} style={styles}>
    {name}
    <div className="icon" style={{backgroundImage: `url(${icon})`}}></div>
  </div>
);

export default Card;
