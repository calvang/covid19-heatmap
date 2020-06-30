import React, { Component } from 'react';
import MapContainer from './Map';
import countryList from '../countryDataFull.json';

export default class FetchMapData extends Component {
  constructor() {
    super();
    this.state = {
      heatmapData: [],
      globalData: {}
    };
    this.apiUrl = 'https://api.covid19api.com/summary';
  }

  componentDidMount() {
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
      // console.log(summaryData);
      var i = [];
      var j = [];
      for (i in countryList) {
        for (j in summaryData) {
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
        globalData: global
      })
      // console.log("HEATMAP DATA!");
      // console.log(this.state.heatmapData);
      // console.log("GLOBAL DATA!");
      // console.log(this.state.globalData);
    })
    .catch((error) => console.log(error));

    // const { apiUrl } = this;
    // // Get all the countries/provinces
    // fetch(apiUrl + 'countries', { credentials: 'same-origin'})
    // .then((response) => {
    //   if (!response.ok) throw Error (response.statusText);
    //   return response.json();
    // })
    // .then((data) => {
    //   this.setState({
    //     locations: data
    //   })
    //   console.log(this.state.locations);
    // })
    // .then(async data => {
    //   const { locations, heatmapData, currentDate, twoDaysAgo } = this.state;
    //   await Promise.all(locations.map((dict) => {
    //     let country = dict.Country;
    //     let url = apiUrl + "country/" + country + "?" + "from=" + twoDaysAgo + "&to=" + currentDate;
    //     console.log(url);
    //     return fetch(url, { credentials: 'same-origin' })
    //       .then((response) => {
    //         if (!response.ok) throw Error (response.statusText);
    //         return response.json();
    //       })
    //       .then((data) => {
    //         console.log(data);
    //         this.setState({
    //           heatmapData: heatmapData.append(data[data.length - 1])
    //         })
    //       })
    //   }));
    // })
    // .then(() => {
    //   console.log(this.state.heatmapData);
    // })
    // .catch((error) => console.log(error));
  }
       
  renderMap(map, maps) {
    console.log("Map Rendered")
  }

  render() {
    return (
      <MapContainer />
    );
  }
}