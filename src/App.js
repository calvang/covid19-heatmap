import React from 'react';
import MapView from './views/MapView';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import './css/App.css';

function App() {
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <>
      <MapView isMobile={matches} />
    </>
  );
}

export default App;
