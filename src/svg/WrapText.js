import React, {useRef, useLayoutEffect, useState} from 'react';

const splitAt = (text, segments, splitPoint) => {
  return [text.slice(0, splitPoint), ...splitText(text.slice(splitPoint+1), segments - 1)];
}

const splitText = (text, segments) => {
  if (segments === 1) {
    return [text];
  }

  const targetLength = text.length / segments;
  const spaceBefore = text.lastIndexOf(" ", targetLength);
  const spaceAfter = text.indexOf(" ", targetLength);

  console.log({length: text.length, segments, spaceBefore, targetLength, spaceAfter});
  const deltaBefore = spaceBefore !== -1 ? (targetLength - spaceBefore) : null;
  const deltaAfter = spaceAfter !== -1 ? (spaceAfter - targetLength) : null;
  // No spaces to break on.
  if (deltaBefore == null && deltaAfter == null) {
    return [text];
  } if (deltaBefore == null || deltaAfter == null) {
    return splitAt(text, segments, deltaBefore !== null ? spaceBefore : spaceAfter, segments);
  } if (deltaBefore <= deltaAfter) {
    return splitAt(text, segments, spaceBefore);
  } else {
    return splitAt(text, segments, spaceAfter);
  }
}

const WrapText = ({text="", x, y, width, height}) => {
  // Ref used to measure the text block
  const textRef = useRef(null);

  // State holds the current text breaking strategy
  const [textBreak, setTextBreak] = useState({base: "", split: [""]});
  const [overflow, setOverflow] = useState(false);

  // If state doesn't match the current text, update state.
  if (textBreak.base !== text) {
    setTextBreak({base: text, split: [text]});
  }

  useLayoutEffect(() => {
    // Get the width of the current layout
    const boundingRect = textRef.current.getBBox();
    const currentTextLength = boundingRect.width;

    // We can fit up to height / lineHeight lines in the region.
    const maxLines = height / 150;

    const overflowing = currentTextLength > width

    if (overflowing) {
      // If we are currently overflowing
      const lineCount = textBreak.split.length;
      console.log("Overflow", currentTextLength, "lines", lineCount, "/", maxLines);
      console.log("lines", textBreak.split)

      if (lineCount + 1 <= maxLines) {
        setTextBreak({base: text, split: splitText(textBreak.base, lineCount+1)});
      } else {
        setOverflow(true);
        console.log("too many lines")
      }
    } else {
      if (overflow) {
        setOverflow(false);
      }
      console.log("Length OK", currentTextLength);
    }
  }, [width, height, overflow, text, textBreak.base, textBreak.split]);
  
  const textBaseX = x + (width/2);
  const textBaseY = y + (height/2) - (75 * (textBreak.split.length - 1));

  const makeSpan = (text, index) => (<tspan x={textBaseX} dy={(index > 0) ? 150 : 0}>{text}</tspan>)

  return (<g>
    <rect x={x} y={y} width={width} height={height} fill={ overflow ? "pink" : "none"}/>
    <text dominant-baseline="middle" ref={textRef} x={textBaseX} y={textBaseY} className="panelName">{textBreak.split.map(makeSpan)}</text>
  </g>);
}

export default WrapText;