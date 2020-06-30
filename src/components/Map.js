import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import apiKey from '../apiKey.json';
import { googleMapStyles } from '../MapStyle';

export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heatmapData: {},
      center: {
        lat: 40,
        lng: 23
      },
      zoom: 0,
      options: {
        panControl: false,
        mapTypeControl: false,
        scrollwheel: false,
        styles: googleMapStyles.customDark
      }
    }
  }


  componentWillMount() {
    // var heatmapPositions = [];
    // var willWait = new Promise(
    //   function (resolve, reject) {
    //     if (true) {
    //       resolve();
    //     } else {
    //       reject(new Error('Heatmap not loaded'));
    //     }
    //   }
    // );
    // var waitForData = () => {
    //   willWait
    //   .then((fulfilled) => {
    //     var i = {};
    //     for (i in this.props.heatmapData) {
    //       if (i.Lat !== undefined) {
    //         heatmapPositions.push({
    //           lat: i.Lat,
    //           lng: i.Lon
    //         });
    //       }
    //     }
    //     var heatmap = {
    //       positions: heatmapPositions,
    //       options: {
    //         radius: 20,
    //         opacity: 1
    //       }
    //     };
    //     this.setState({
    //       heatmapData: heatmap
    //     });
    //     console.log("FINAL CHECK!");
    //     console.log(this.state.heatmapData);
    //   })
    //   .catch((error) => {console.log(error.message)})
    // }
    // var i = {};
    // for (i in this.props.heatmapData) {
    //   if (i.Lat !== undefined) {
    //     heatmapPositions.push({
    //       lat: i.Lat,
    //       lng: i.Lon
    //     });
    //   }
    // }
    // var heatmap = {
    //   positions: heatmapPositions,
    //   options: {
    //     radius: 20,
    //     opacity: 1
    //   }
    // };
    var heatmapPositions = [];
    var i = {};
    console.log("Initial transmission");
    console.log(this.props.heatmapData);
    for (i of this.props.heatmapData) {
      
        heatmapPositions.push({
          lat: i.Lat,
          lng: i.Lon
        });
      
    }
    console.log(heatmapPositions);
    var heatmap = {
      positions: heatmapPositions,
      options: {
        radius: 20,
        opacity: 1
      }
    };
    this.setState({
      heatmapData: heatmap
    });
    console.log("FINAL CHECK!");
    console.log(this.state.heatmapData);
  }

  renderMap(map, maps) {
    console.log("Map Rendered")
  }

  render() {
  //   var heatmapData = {
  //     positions: [
  //       {lat: 55.5, lng: 34.56},
  //       {lat: 55.5, lng: 34.56},
  //       {lat: 55.5, lng: 34.56},
  //       {lat: 55.5, lng: 34.56},
  //       {lat: 55.5, lng: 34.56},
  //       {lat: 34.7, lng: 28.4}
  //     ],
  //     options: {
  //       radius: 20,
  //       opacity: 1
  //     }
  //   }
    console.log("Rendering map...");
    const { zoom, center, options, heatmapData } = this.state;
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={apiKey}
          defaultZoom={zoom}
          defaultCenter={center}
          options={options}
          yesIWantToUseGoogleMapApiInternals={true}
          heatmapLibrary={true}          
          heatmap={heatmapData}  
          onGoogleApiLoaded={() => this.renderMap()}
        />
      </div>
    );
  }
}