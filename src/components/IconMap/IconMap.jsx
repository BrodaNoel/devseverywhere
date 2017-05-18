import React, { Component } from 'react';
import icon from './imgs/icon.png';
import './styles.css';

export class IconMap extends Component {
  render() {
    return (
      <img className="IconMap" src={icon} alt="icon"/>
    );
  }
};
