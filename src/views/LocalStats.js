import React, { Component } from 'react';
import { formatNum } from '../components/GlobalTables';
import { ListNav } from '../components/ListNav';
import usCountyData from '../dataset/fullCountyData.json';
import '../css/App.css';

export const Table1 = (props) => {
  var sortConfirmed = props.countyData.sort(function(a,b){return b.Cases-a.Cases});
  return(
      <table className="panel-table"><tbody>
      {sortConfirmed.map(item => {
        return <tr>
          <td className="panel-table-el" >{item.County}, {item.State}</td>
          <td>{formatNum(item.Cases)}</td>
        </tr>;
      })}
      </tbody></table>
  );
}

export const Table2 = (props) => {
  var sortDeaths = props.countyData.sort(function(a,b){return b.CasesPerMillion-a.CasesPerMillion});
  return(
      <table className="panel-table"><tbody>
      {sortDeaths.map(item => {
        return <tr>
          <td className="panel-table-el" >{item.County}, {item.State}</td>
          <td>{formatNum(item.CasesPerMillion)}</td>
        </tr>;
      })}
      </tbody></table>
  );
}

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.countryData.find(i => i.ISO2 === 'US'),
      searchVal: '',
      searchResults: [],
      countries: props.countryData,
      cursor: 0,
      sortBy: [
        'Confirmed Cases',
        'Cases Per Million'
      ],
      currentSort: 0
    }
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  changeSearchString = (event) => {
    console.log("Yo", event.target.value);
    const { countries } = this.state;
    this.setState({
      searchVal: event.target.value,
      searchResults: countries.filter(country => {
        return country.Country.toLowerCase().includes(this.state.searchVal.toLowerCase());
      })
    })
  }

  changeCountry = (event) => {
    event.preventDefault();
    console.log("Yeet", event.target.value);
    const { searchResults, countries } = this.state;
    console.log(searchResults[0])
    console.log(countries.find(i => i.Country === searchResults[0]))
    this.setState({
      data: searchResults[0],
      searchVal: '',
      searchResults: []
    })
  }

  handleKeyDown(e) {
    const { cursor, searchResults } = this.state
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && cursor > 0) {
      this.setState( prevState => ({
        cursor: prevState.cursor - 1
      }))
    } else if (e.keyCode === 40 && cursor < searchResults.length - 1) {
      this.setState( prevState => ({
        cursor: prevState.cursor + 1
      }))
    }
  }

  changeSort = () => {
    const { currentSort } = this.state;
    var nextSort;
    currentSort < 1 ? nextSort = currentSort + 1 : nextSort = 0;
    //console.log(nextSort)
    this.setState({ currentSort: nextSort });
  }

  render() {
    const { data, searchVal, searchResults, currentSort, sortBy } = this.state;
    const Tables = {
      0: <Table1 countyData={usCountyData} />,
      1: <Table2 countyData={usCountyData} />
    }

    var totalRecoveryRate = parseFloat(data.PercentRecovered.toFixed(2));
    var totalMortalityRate = parseFloat(data.ConfirmedDeathRate.toFixed(2));

    return (
      <div className="panel w3-animate-left w3-light-gray" >
        {/* <label style={{marginTop: '10px'}} htmlFor="search">Search by country</label>
        <input type="text" value={searchVal} onChange={this.changeSearchString}/> */}
        <div style={{align:'right', textAlign:'right'}}>
        <form style={{borderRadius: '5px'}}>
          <button 
            type="submit" 
            style={{padding:'2px'}}
            className="w3-button" 
            onClick={this.changeCountry}
          ><i className="fa fa-search fa-fw w3-xlarge"></i></button>
          <input type="text" className='search'
            style={{marginTop: '10px', left: 0,borderRadius: '5px', outline:'none'}}
            placeholder="Search Countries.."
            value={searchVal}
            onChange={this.changeSearchString}
          />
        </form>
        </div>
        <div style={{textAlign: 'center'}}>
          <ListNav items={searchResults} />
        </div>
        {/* <div>{searchResults.map(i => <p>{i.Country}</p>)}</div> */}
 
        <h1 className="panel-title">
          <i className="fa fa-map-marker fa-fw w3-xlarge"></i>{data.Country}
        </h1>
        <h3 className="panel-header"><b>Totals</b></h3>
        <p>Confirmed: <b>{formatNum(data.TotalConfirmed)}</b></p>
        <p>Recovered: <b>{formatNum(data.TotalRecovered)}</b></p>
        <p>Deaths: <b>{formatNum(data.TotalDeaths)}</b></p>
        <p>Percent Recovered: <b>{totalRecoveryRate}%</b> (Recovered vs. Confirmed)</p>
        <p>Mortality Rate: <b>{totalMortalityRate}%</b> (Deaths vs. Recovered)</p>
        <p>Cases per Million: <b>{formatNum(data.ConfirmedPerCapita)}</b></p>
        <p>Deaths per Million: <b>{formatNum(data.DeathsPerCapita)}</b></p>
        <h3 className="panel-header"><b>Today</b></h3>
        <p>Confirmed: <b>{formatNum(data.NewConfirmed)}</b></p>
        <p>Recovered: <b>{formatNum(data.NewRecovered)}</b></p>
        <p>Deaths: <b>{formatNum(data.NewDeaths)}</b></p>
        <br></br>
        { data.ISO2 === 'US' ?
        <>
        <div style={{display: 'inline'}}>
          <h3 className="panel-header" style={{display: 'inline'}}>
            <b>Counties by {sortBy[currentSort]}</b>
          </h3>
          <button className="w3-bar-item w3-button w3-padding"
            style={{float: 'right', padding: '0px'}}
            onClick={this.changeSort}>
              <i className="fa fa-sort fa-fw w3-xlarge"></i>
          </button>
        </div>
        {Tables[currentSort]}
        </>
        : null}
      </div>
    );
  }
}