import React from 'react';
import {WrapText} from '../svg';

const ScheduleSign = React.forwardRef((props, ref) => (
  <svg ref={ref} version="1.1" xmlns="http://www.w3.org/2000/svg" width="11in" height="8.5in" viewBox="0 0 1100 850">
    <rect x="0" y="0" width="1100" height="850" stroke="black" fill="white" />
    <WrapText text={props.panelName} x={50} y={200} width={1000} height={450} fontFamily="Diavlo" fontSize={150}/>
  </svg>
))
ScheduleSign.varNames = ["panelName"]

export default ScheduleSign;