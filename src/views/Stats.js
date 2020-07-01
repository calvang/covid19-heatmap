import React from 'react';
import Options from '../views/Options';
import Stats from '../views/Stats';
import Contact from '../views/Contact';
import '../css/App.css';

const Menuitems = () => {
  return (
    <>
      <a href="/" className="w3-bar-item w3-button w3-padding">
        <i className="fa fa-cog fa-fw w3-xlarge"></i>
        <p>Options</p>
      </a>
      <a href="/" className="w3-bar-item w3-button w3-padding">
        <i className="fa fa-database fa-fw w3-xlarge"></i>
        <p>Stats</p>
      </a>
      <a href="/" className="w3-bar-item w3-button w3-padding">
        <i className="fa fa-info-circle fa-fw w3-xlarge"></i>
        <p>About</p>
      </a>
      <a href="/" className="w3-bar-item w3-button w3-padding">
        <i className="fa fa-users fa-fw w3-xlarge"></i>
        <p>Contact</p>
      </a>
    </>
  );
}

export default class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      isMenuOpen: false,
      panels: [],
      currentPanel: 0
    }
  }

  toggleMenu = () => {
    const { isMenuOpen } = this.state;
    isMenuOpen ? this.setState({ isMenuOpen: false }) 
    : this.setState({ isMenuOpen: true });
  }


  render() {
    const { isMenuOpen } = this.state;
    return (
      <div className="w3-gray">
        { isMenuOpen ?
            <nav className="sidebar w3-white w3-animate-left" styles="z-index:3;width:100px;" id="mySidebar">
              <div className="w3-bar-block w3-center">
                <button className="w3-bar-item w3-button w3-padding" 
                  onClick={this.toggleMenu}>
                  <i className="fa fa-bars fa-fw w3-xlarge"></i>
                  <p>Hide</p>
                </button> 
                <Menuitems />
              </div>
            </nav>
          : 
          <nav className="topbar w3-white" styles="z-index:3;width:100px;" id="mySidebar">
            <div className="w3-bar-block w3-center">
              <button className="w3-bar-item w3-button w3-padding" 
                onClick={this.toggleMenu}>
                <i className="fa fa-bars fa-fw w3-xlarge"></i> Covid-19 Projection Map
              </button> 
            </div>
          </nav>
          }
      </div>
    );
  }
}