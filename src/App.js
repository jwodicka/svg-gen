import React from 'react';
import './App.css';


import Sign from './svg/FoolscapScheduleItem';
import SvgEditor from './SvgEditor';

function App() {
  return (
    <SvgEditor templateComponent={Sign}/>
  );
}

export default App;
