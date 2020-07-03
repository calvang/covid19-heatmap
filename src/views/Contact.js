import React, { Component } from 'react';
import '../css/App.css';

export default class Contact extends Component {
  render() {
    console.log("Entered Contact");
    return (
      <div >
        <div className="panel w3-animate-left w3-light-gray" >
          <h1 className="panel-title">
            <i className="fa fa-users fa-fw w3-xlarge"></i>
            Contact
          </h1>
          <p>If you have any questions or ideas for new features, or want to get in touch,
             feel free to contact me!
          </p>
          <br></br>
          <p style={{textAlign: 'center'}}>
            <i className="fa fa-github fa-fw w3-xxlarge"></i>Find me on Github: 
            <a style={{color:'black'}} href='https://github.com/calvang'>@calvang</a>
          </p>
          <div className="panel-center">
            <button className="w3-bar-item w3-button w3-padding">
              <a style={{color:'black'}} href='https://github.com/calvang'>Go</a>
              <i className="fa fa-chevron-right fa-fw w3-small"></i>
            </button> 
          </div>
        </div>
      </div>
    );
  }
}