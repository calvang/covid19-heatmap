import React, { Component } from 'react';
import Slides from './Slides';
import Options from '../views/Options';
import Global from '../views/GlobalStats';
import USA from '../views/USAStats';
import Contact from '../views/Contact';
import '../css/App.css';

const Panels = {
  0: null,
  1: <Options />,
  2: <Global />,
  3: <USA />,
  4: <Contact />
}

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCarouselOpen: true,
      isDropOpen: false,
      isMenuOpen: false,
      panels: [0,1,2,3,4],
      currentPanel: 0
    }
    this.hideCarousel = this.hideCarousel.bind(this);
    this.openPanel = this.openPanel.bind(this);
  }

  toggleMenu = () => {
    const { isMenuOpen } = this.state;
    isMenuOpen ? this.setState({ isMenuOpen: false }) 
    : this.setState({ isMenuOpen: true });
  }

  showCarousel = () => {
    this.setState({ isCarouselOpen: true });
  }

  hideCarousel = () => {
    this.setState({ isCarouselOpen: false });
  }

  toggleDrop() {
    const { isDropOpen, currentPanel } = this.state;
    if (isDropOpen) {
      this.setState({ isDropOpen: false });
    } else {
      this.setState({ isDropOpen: true });
    }
    this.openPanel(currentPanel);
  }

  openPanel(panelNum) {
    const { currentPanel } = this.state;
    panelNum === currentPanel ? this.setState({ currentPanel: 0 })
      : this.setState({ currentPanel: panelNum });
    console.log("Current State: ");
    console.log(this.state.currentPanel);
  }

  render() {
    const { isMenuOpen, isDropOpen } = this.state;
    const { globalData } = this.props;
    //console.log(this.props.globalData)
    return (
      <div className="w3-gray">
        <Slides
          handleOpen={this.state.isCarouselOpen}
          setHandleOpen={this.hideCarousel}
          isMobile={this.props.isMobile}
        />
        { isMenuOpen ?
          <div className="sidebar w3-white">
            <nav className="sidebar w3-white w3-animate-top" styles="z-index:3;width:100px;" id="mySidebar">
              <br></br>
              <div className="w3-bar-block w3-center">
                <button className="w3-bar-item w3-button w3-padding" 
                  onClick={this.toggleMenu}>
                  <i className="fa fa-bars fa-fw w3-xlarge"></i>
                  <p>Hide</p>
                </button> 
                <button className="w3-bar-item w3-button w3-padding"
                  onClick={() => this.openPanel(1)}>
                  <i className="fa fa-cog fa-fw w3-xlarge"></i>
                  <p>Options</p>
                </button>
                <button className="w3-bar-item w3-button w3-padding"
                  onClick={() => this.toggleDrop()}>
                  <i className="fa fa-database fa-fw w3-xlarge"></i>
                  <p>Stats</p>
                </button>
                { isDropOpen ? 
                  <div className="drop w3-light-gray">
                    <button className="w3-bar-item w3-button w3-padding"
                      onClick={() => this.openPanel(2)}>
                      <i className="fa fa-globe fa-fw w3-xlarge"></i>
                      <p>Global</p>
                    </button>
                    <button className="w3-bar-item w3-button w3-padding"
                      onClick={() => this.openPanel(3)}>
                      <i className="fa fa-map-marker fa-fw w3-xlarge"></i>
                      <p>U.S.</p>
                    </button>
                  </div>
                : null }
                <button className="w3-bar-item w3-button w3-padding"
                  onClick={this.showCarousel}>
                  <i className="fa fa-info-circle fa-fw w3-xlarge"></i>
                  <p>About</p>
                </button>
                <button className="w3-bar-item w3-button w3-padding"
                  onClick={() => this.openPanel(3)}>
                  <i className="fa fa-users fa-fw w3-xlarge"></i>
                  <p>Contact</p>
                </button>
              </div>
            </nav>
            {Panels[this.state.currentPanel]}
          </div>
          : 
          <nav className="topbar w3-white" styles="z-index:3;width:100px;" id="mySidebar">
            <div className="w3-bar-block w3-center">
              <button className="w3-bar-item w3-button w3-padding" 
                onClick={this.toggleMenu}>
                <i className="fa fa-bars fa-fw w3-xlarge"></i> Covid-19 Projection Heatmap
              </button> 
            </div>
          </nav>
          }
          <nav className="bottombar w3-white" styles="z-index:3;width:100px;" id="mySidebar">
            <div className="w3-bar-block w3-center">
              <button className="w3-bar-item w3-button w3-padding" 
                onClick={this.toggleMenu}>
                <p>
                Total Cases: {globalData.NewConfirmed}   Total Recovered: {globalData.TotalRecovered}
                </p>
              </button> 
            </div>
          </nav>
      </div>
    );
  }
}