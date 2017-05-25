import React from 'react';
import './styles.css';

export const Error = (props) => (
  <div
    className="Error"
    style={props.styles}
    onClick={e => e.target.remove()}>
    {props.error}
  </div>
);
