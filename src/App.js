import React, { useState } from 'react';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Map from './components/FetchMapData';
import { Slides } from './components/Slides';
import Menu from './Menu';
import './css/App.css';

function App() {
  const [handleOpen, setHandleOpen] = useState({ open: true });
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Menu />
      <Slides
        isMobile={matches}
        handleOpen={handleOpen}
        setHandleOpen={setHandleOpen}
      />
      <Map />
    </>
  );
}

export default App;
