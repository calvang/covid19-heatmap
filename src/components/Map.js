import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import apiKey from '../apiKey.json';
import { googleMapStyles } from '../MapStyle';

export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: {},
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
    this.apiUrl = ''
  }

  // componentDidMount() {
  //   const { apiUrl } = this;
  //   fetch(apiUrl, { credentials: 'same-origin'})
  //   .then((response) => {
  //     if (!response.ok) throw Error (response.statusText);
  //     return response.json();
  //   })
  //   .then((data) => {
  //     this.setState({
  //       currentData: data.body
  //     })
  //   })
  //   .catch((error) => console.log(error));
  // }

  renderMap(map, maps) {
    console.log("Map Rendered")
  }

  render() {
    var heatmapData = {
      positions: [
        {lat: 55.5, lng: 34.56},
        {lat: 55.5, lng: 34.56},
        {lat: 55.5, lng: 34.56},
        {lat: 55.5, lng: 34.56},
        {lat: 55.5, lng: 34.56},
        {lat: 34.7, lng: 28.4}
      ],
      options: {
        radius: 20,
        opacity: 1
      }
    }
    const { zoom, center, options } = this.state;
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