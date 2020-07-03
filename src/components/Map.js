import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import apiKey from '../apiKey.json';
import { googleMapStyles } from './MapStyle';
import countyData from '../dataset/countyCoords.json';
import brazilData from '../dataset/brazilStateDataCoords.json';

export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultGradient: false,
      datasets: {
        'All': true,
        'US': false,
        'Brazil': false,
        'Countries': false
      },
      globalData: {},
      countyData: [],
      heatmapData: {},
      center: {
        lat: 40,
        lng: 23
      },
      zoom: 0,
      options: {
        panControl: true,
        mapTypeControl: false,
        scrollwheel: true,
        styles: googleMapStyles.customDark
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentWillMount() {
    this.addHeatmap()
  }

  // mapCountries(){
  //   var heatmapPositions = [];
  //   var i = {};
  //   for (i of this.props.heatmapData) {
  //     heatmapPositions.push({
  //       lat: i.Lat,
  //       lng: i.Lon,
  //       weight: i.TotalConfirmed
  //     });
  //   }
  //   var heatmap = {
  //     positions: heatmapPositions,
  //     options: {
  //       radius: 20,
  //       opacity: 0.7
  //     }
  //   };
  //   //console.log(heatmap);
  //   this.setState({
  //     heatmapData: heatmap,
  //   });
  // }

  addHeatmap() {
    const { defaultGradient, datasets } = this.state;
    var heatmapPositions = [];
    var i = {};
    console.log(datasets)
    if (datasets['Countries'] || datasets['All']) {
      for (i of this.props.heatmapData) {
        if (datasets['Countries'] || 
          (i.ISO2 !== 'US' && i.ISO2 !== 'BR')) {
          heatmapPositions.push({
            lat: i.Lat,
            lng: i.Lon,
            weight: i.TotalConfirmed
          });
        }
      }
    }
    if (datasets['US'] || datasets['All']) {
      for (i of countyData) {
        heatmapPositions.push({
          lat: i.lat,
          lng: i.lon,
          weight: i.weight
        });
      }
    }
    if (datasets['Brazil'] || datasets['All']) {
    for (i of brazilData) {
        heatmapPositions.push({
          lat: i.lat,
          lng: i.lon,
          weight: i.weight
        });
      }
    }
    //console.log(heatmapPositions);
    var heatmap = {
      positions: heatmapPositions,
      options: {
        gradient: defaultGradient ? null
          :
          [
            'rgba(0, 255, 255, 0)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(0, 127, 255, 1)',
            'rgba(0, 63, 255, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 0, 223, 1)',
            'rgba(0, 0, 191, 1)',
            'rgba(0, 0, 159, 1)',
            'rgba(0, 0, 127, 1)',
            'rgba(63, 0, 91, 1)',
            'rgba(127, 0, 63, 1)',
            'rgba(191, 0, 31, 1)',
            'rgba(255, 0, 0, 1)'
          ],
        radius: 60,
        opacity: 0.7
      }
    };
    this.setState({
      heatmapData: heatmap,
    });
  }

  show() {
    this.setState({ hidden: false })
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