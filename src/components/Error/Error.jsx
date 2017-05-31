import React from 'react';
import './styles.css';

export const Error = (props) => (
  <div
    className="Error"
    onClick={e => e.target.remove()}>
    {props.error}
  </div>
);
