import React, { Component } from 'react';
import { Table1, Table2, Table3, Table4, Table5 } from '../components/GlobalTables';
import '../css/App.css';



export default class Stats extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSort: 0,
      sortBy: [
        'Total Cases',
        'Total Deaths',
        'Mortality Rate',
        'Cases Per Million',
        'Deaths Per Million'
      ],
    };
  }

  changeSort = () => {
    const { currentSort } = this.state;
    var nextSort;
    currentSort < 4 ? nextSort = currentSort + 1 : nextSort = 0;
    console.log(nextSort)
    this.setState({ currentSort: nextSort });
  }

  render() {
    const { globalData, countryData } = this.props;
    const { currentSort, sortBy } = this.state;
    var totalRecoveryRate = parseFloat((100 * globalData.TotalRecovered / globalData.TotalConfirmed).toFixed(2));
    var totalMortalityRate = parseFloat((100 * globalData.TotalDeaths / globalData.TotalRecovered).toFixed(2));
    var scaledMortality = Math.round(1_000_000 * globalData.TotalDeaths / 7660016300);
    const Tables = {
      0: <Table1 countryData={countryData} />,
      1: <Table2 countryData={countryData} />,
      2: <Table3 countryData={countryData} />,
      3: <Table4 countryData={countryData} />,
      4: <Table5 countryData={countryData} />
    }
    return (
      <div className="panel w3-animate-left w3-light-gray" >
        <h1 className="panel-title">
          <i className="fa fa-globe fa-fw w3-xlarge"></i>
          Global Statistics
        </h1>
        <h3 className="panel-header"><b>Totals</b></h3>
        <p>Confirmed: <b>{globalData.TotalConfirmed}</b></p>
        <p>Recovered: <b>{globalData.TotalRecovered}</b></p>
        <p>Deaths: <b>{globalData.TotalDeaths}</b></p>
        <p>Current Recovery: <b>{totalRecoveryRate}%</b> (Recovered vs. Confirmed)</p>
        <p>Mortality Rate: <b>{totalMortalityRate}%</b> (Deaths vs. Recovered)</p>
        <p>Deaths per Million: <b>{scaledMortality}</b></p>
        <h3 className="panel-header"><b>Today</b></h3>
        <p>Confirmed: <b>{globalData.NewConfirmed}</b></p>
        <p>Recovered: <b>{globalData.NewRecovered}</b></p>
        <p>Deaths: <b>{globalData.NewDeaths}</b></p>
        <div style={{display: 'inline'}}>
          <h3 style={{display: 'inline'}}>
            <b>Countries by {sortBy[currentSort]}</b>
          </h3>
          <button className="w3-bar-item w3-button w3-padding"
            style={{float: 'right'}}
            onClick={this.changeSort}>
              <i className="fa fa-sort fa-fw w3-xlarge"></i>
          </button>
        </div>
        {Tables[currentSort]}
      </div>
    );
  }
}