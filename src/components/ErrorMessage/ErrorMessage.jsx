import React from 'react';
import './styles.css';

export const ErrorMessage = (props) => (
  <div
    className="ErrorMessage"
    style={props.styles}
    onClick={e => e.target.remove()}>
    {props.error}
  </div>
);
