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
    var heatmapPositions = [];
    var i = {};
    //console.log("Initial transmission");
    //console.log(this.props.heatmapData);
    for (i of this.props.heatmapData) {
        heatmapPositions.push({
          lat: i.Lat,
          lng: i.Lon,
          weight: i.TotalConfirmed
        });
    }
    //console.log(heatmapPositions);
    var heatmap = {
      positions: heatmapPositions,
      options: {
        // gradient: [
        //   'rgba(0, 255, 255, 0)',
        //   'rgba(0, 255, 255, 1)',
        //   'rgba(0, 191, 255, 1)',
        //   'rgba(0, 127, 255, 1)',
        //   'rgba(0, 63, 255, 1)',
        //   'rgba(0, 0, 255, 1)',
        //   'rgba(0, 0, 223, 1)',
        //   'rgba(0, 0, 191, 1)',
        //   'rgba(0, 0, 159, 1)',
        //   'rgba(0, 0, 127, 1)',
        //   'rgba(63, 0, 91, 1)',
        //   'rgba(127, 0, 63, 1)',
        //   'rgba(191, 0, 31, 1)',
        //   'rgba(255, 0, 0, 1)'
        // ],
        radius: 100,
        opacity: 0.7
      }
    };
    this.setState({
      heatmapData: heatmap
    });
    //console.log("FINAL CHECK!");
    //console.log(this.state.heatmapData);
  }

  renderMap(map, maps) {
    console.log("Map Rendered")
  }

  render() {
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