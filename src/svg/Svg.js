import PropTypes from 'prop-types';
import React from 'react';

const getVariables = (args) => {
  // Iterate through the args and identify the needed variables.
  const variableNames = new Set();

  const variables = args.map(arg => {
    // Interpret strings as the names of variables;
    if (typeof arg === "string") {
      variableNames.add(arg);
      return variable(arg);
    } else if ("varName" in arg) {
      variableNames.add(arg.varName);
      return arg;
    } else if (typeof arg === "function") {
      return arg;
    } else {
      throw new Error("Didn't understand arg while building SVG.");
    }
  })

  return [[...variableNames], variables];
}

// wrapper function for generating variables
export const variable = (name, args={}) => {
  let type = args.type || PropTypes.string;
  const required = args.required || false;

  if (required) {
    type = type.isRequired;
  }

  const defaultValue = args.defaultValue || "";

  const lookupFn = (props) => {
    if (name in props && props[name] !== "") {
      return props[name];
    }
    return defaultValue;
  }
  lookupFn.varName = name;
  lookupFn.propType = type;
  return lookupFn;
}

// Template string function that takes an SVG with variables as args, and produces a React component
// that accepts those variables as props.
export const svg = ({rootComponent='svg', ...props}={}) => {

  const baseProps = (rootComponent === "svg") ? {version:"1.1", xmlns:"http://www.w3.org/2000/svg"} : {};
  const rootProps = {...baseProps, ...props}; 
  
  return (strings, ...args) => {
    const [varNames, vars] = getVariables(args);

    const interleaved = vars.reduce(
      (acc, varName, index) => [...acc, varName, strings[index + 1]],
      [strings[0]]
    );

    const Component = React.forwardRef((props, ref) => {
      const content = interleaved
        .map(part => (typeof part === "function" ? part(props) : part))
        .join("");

      const wrapperProps = {
        ...rootProps,
        ref,
        dangerouslySetInnerHTML: {__html: content},
      };

      return React.createElement(rootComponent, wrapperProps);
    });

    Component.varNames = varNames;
    Component.propTypes = vars.reduce(
      (acc, variable) => ({...acc, [variable.varName]: variable.propType}), {}
    )

    return Component;
  }
};
