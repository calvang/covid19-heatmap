import React, { Component } from 'react';
import MapContainer from './Map';
import Menu from './Menu';
import countryList from '../dataset/fullDataSet.json';
import countyData from '../dataset/fullCountyData.json';

export default class FetchMapData extends Component {
  constructor() {
    super();
    this.state = {
      countyData: [],
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
    // fetch live global updates
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
            var confirmedPerCapita = Math.round(1_000_000 * Number(j.TotalConfirmed)/Number(i.Population));
            var deathsPerCapita = Math.round(1_000_000 * Number(j.TotalDeaths)/Number(i.Population));
            var confirmedDeathRate = 100 * Number(j.TotalDeaths)/Number(j.TotalRecovered);
            var percentRecovered = 100 * Number(j.TotalRecovered)/Number(j.TotalDeaths);
            if (confirmedDeathRate === Infinity) {
              confirmedDeathRate = 0;
            }
            if (percentRecovered === Infinity) {
              percentRecovered = 'unknown';
            }
            caseData.push({
              Country: i.Country,
              Population: i.Population,
              Lat: i.Lat,
              Lon: i.Lon,
              NewConfirmed: j.NewConfirmed,
              TotalConfirmed: j.TotalConfirmed,
              ConfirmedPerCapita: confirmedPerCapita,
              NewDeaths: j.NewConfirmed,
              TotalDeaths: j.TotalDeaths,
              DeathsPerCapita: deathsPerCapita,
              ConfirmedDeathRate: confirmedDeathRate,
              NewRecovered: j.NewRecovered,
              TotalRecovered: j.TotalRecovered,
              PercentRecovered: percentRecovered,
              Date: j.Date,
              ISO2: i.ISO2
            });
            break;
          }
        }
      }
    })
    .then((data) => {
      this.setState({
        countyData: countyData,
        heatmapData: caseData,
        globalData: global,
      })
      //console.log(this.state.heatmapData);
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
        <Menu 
          isMobile={this.props.isMobile}
          globalData={this.state.globalData}
          countryData={this.state.heatmapData}/>
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