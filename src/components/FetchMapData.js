import React, { Component } from 'react';
import MapContainer from './Map';
import countryList from '../countryDataFull.json';

export default class FetchMapData extends Component {
  constructor() {
    super();
    this.state = {
      heatmapData: [],
      globalData: {},
      isLoaded: false
    };
    this.apiUrl = 'https://api.covid19api.com/summary';
  }

  componentWillMount() {
    const { apiUrl } = this;
    var caseData = [];
    var global = {};
    fetch(apiUrl, { credentials: 'same-origin'})
    .then((response) => {
      if (!response.ok) throw Error (response.statusText);
      return response.json();
    })
    .then((data) => {
      var summaryData = data.Countries;
      global = data.Global
      var i = [];
      var j = [];
      for (i of countryList) {
        for (j of summaryData) {
          if (i.ISO2 === j.CountryCode) {
            caseData.push({
              Lat: i.Lat,
              Lon: i.Lon,
              NewConfirmed: j.NewConfirmed,
              TotalConfirmed: j.TotalConfirmed,
              NewDeaths: j.NewConfirmed,
              TotalDeaths: j.TotalDeaths,
              NewRecovered: j.NewRecovered,
              TotalRecovered: j.TotalRecovered,
              Date: j.Date
            });
            break;
          }
        }
      }
    })
    .then((data) => {
      this.setState({
        heatmapData: caseData,
        globalData: global,
      })
    })
    .then((data) => {
      this.setState({
        isLoaded: true
      });
    })
    .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        { this.state.isLoaded &&
        <MapContainer 
          heatmapData={this.state.heatmapData}
          isLoaded={this.state.isLoaded}
        />
        }
      </div>
    );
  }
}