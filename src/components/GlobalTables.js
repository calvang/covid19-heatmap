import React from 'react';
import '../css/App.css';


export function formatNum(num) {
    return String(num).replace(/(.)(?=(\d{3})+$)/g,'$1,')
}

export const Table1 = (props) => {
    var sortConfirmed = props.countryData.sort(function(a,b){return b.TotalConfirmed-a.TotalConfirmed});
    return(
        <table className="panel-table"><tbody>
        {sortConfirmed.map(item => {
          return <tr>
            <td className="panel-table-el" >{item.Country}</td>
            <td>{formatNum(item.TotalConfirmed)}</td>
          </tr>;
        })}
        </tbody></table>
    );
}

export const Table2 = (props) => {
    var sortDeaths = props.countryData.sort(function(a,b){return b.TotalDeaths-a.TotalDeaths});
    return(
        <table className="panel-table"><tbody>
        {sortDeaths.map(item => {
          return <tr>
            <td className="panel-table-el" >{item.Country}</td>
            <td>{formatNum(item.TotalDeaths)}</td>
          </tr>;
        })}
        </tbody></table>
    );
}

export const Table3 = (props) => {
    var sortRate = props.countryData.sort(function(a,b){return b.ConfirmedDeathRate-a.ConfirmedDeathRate});
    return(
        <table className="panel-table"><tbody>
        {sortRate.map(item => {
          return <tr>
            <td className="panel-table-el" >{item.Country}</td>
            <td>{parseFloat((Number(item.ConfirmedDeathRate)/100).toFixed(2))}</td>
          </tr>;
        })}
        </tbody></table>
    );
}

export const Table4 = (props) => {
    var sortConfirmedPer = props.countryData.sort(function(a,b){return b.ConfirmedPerCapita-a.ConfirmedPerCapita});
    return(
        <table className="panel-table"><tbody>
        {sortConfirmedPer.map(item => {
          return <tr>
            <td className="panel-table-el" >{item.Country}</td>
            <td>{formatNum(item.ConfirmedPerCapita)}</td>
          </tr>;
        })}
        </tbody></table>
    );
}

export const Table5 = (props) => {
    var sortDeathsPer = props.countryData.sort(function(a,b){return b.DeathsPerCapita-a.DeathsPerCapita});
    return(
        <table className="panel-table"><tbody>
        {sortDeathsPer.map(item => {
          return <tr>
            <td className="panel-table-el" >{item.Country}</td>
            <td>{formatNum(item.DeathsPerCapita)}</td>
          </tr>;
        })}
        </tbody></table>
    );
}
