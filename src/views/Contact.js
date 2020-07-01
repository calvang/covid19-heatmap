import React, { Component } from 'react';
import '../css/App.css';

export default class Contact extends Component {
  render() {
    console.log("Entered Contact");
    return (
      <div >
        <div className="panel w3-animate-left w3-light-gray" >
          <h1 className="panel-title">
            <i className="fa fa-cog fa-fw w3-large"></i>
            Contact
          </h1>
          <p>Antidisestablishmentarianism</p>
          <p>Pneumonoultramicroscopicsiliconvolcanoconiosis</p>
          <div className="panel-center">
            <button className="w3-bar-item w3-button w3-padding">
                    Go<i className="fa fa-chevron-right fa-fw w3-small"></i>
            </button> 
          </div>
        </div>
      </div>
    );
  }
}