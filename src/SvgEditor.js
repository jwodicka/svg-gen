import React, {useState, useRef} from 'react';
import './SvgEditor.css';
import { saveAs } from 'file-saver';

function SvgEditor({templateComponent}) {
  const SvgComponent = templateComponent;

  const [vars, setVars] = useState({});
  const svgElement = useRef(null);

  const setVar = (name) => (event) => {
    setVars({...vars, [name]: event.target.value});
  }

  const getVar = (name) => {
    if (name in vars) {
      return vars[name];
    } else {
      return "";
    }
  };

  const saveSvg = () => {
    const svgContent = svgElement.current.outerHTML;
    const blob = new Blob([svgContent], {type: "image/svg+xml;charset=utf-8"});
    saveAs(blob, "generated.svg");
  }

  return (
    <div className="SvgEditor">
      <div className="Pane">
        <ul>{
          SvgComponent.varNames.map((name) =>
            <li key={name}>{name}: <input type="text" value={getVar(name)} onChange={setVar(name)}/></li>  
          )
        }</ul>
        <button onClick={saveSvg}>Save SVG</button>
      </div>
      <div className="Pane">
        <SvgComponent ref={svgElement} {...vars} />
      </div>
    </div>
  );
}

export default SvgEditor;
