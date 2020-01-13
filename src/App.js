import React from 'react';
import './App.css';


import {FoolscapScheduleItem as Sign} from './templates';
import SvgEditor from './SvgEditor';

function App() {
  return (
    <SvgEditor templateComponent={Sign}/>
  );
}

export default App;
