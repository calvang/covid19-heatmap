import React from 'react';
import Slider from './Slider'
import logo from './logo.svg';
import './App.css';

class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-body">
          <Slider />
          <h2 className="header padded-top">
            Sample Personal Github.io page built on Reactjs
          </h2>
          <img src={logo} className="App-logo" alt="logo" />
          <p className="padded-bottom"><b>
            Get started on your own Reactjs project today!
          </b></p>
        </div>
      </div>
    );
  }
}

export default Home;
