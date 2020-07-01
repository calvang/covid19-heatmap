import React from 'react';
import Map from './components/FetchMapData';
import Menu from './components/Menu';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import './css/App.css';

function App() {
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Menu isMobile={matches}/>
      <Map />
    </>
  );
}

export default App;
