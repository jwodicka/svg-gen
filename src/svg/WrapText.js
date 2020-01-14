import React, {useRef, useLayoutEffect, useState} from 'react';

/* Helper functions for managing text layout */
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

/* The actual component we export */
const WrapText = ({
    text="",
    x,
    y,
    width,
    height,
    fontFamily="sans-serif",
    fontSize=100,
  }) => {
  /************************************************************************************************/
  /* Define hooks */

  // textRef is used to measure the text block post-rendering
  const textRef = useRef(null);

  // textBreak holds the current text breaking strategy
  const [textBreak, setTextBreak] = useState({base: "", split: [""]});

  // overflow holds whether we are currently in an overflow state
  const [overflow, setOverflow] = useState(false);

  /************************************************************************************************/
  /* Define derived values */

  // textStyle will be applied to the outer text element
  const textStyle = {
    fontFamily,
    fontSize,
    textAnchor: "middle",
  }

  // halfLineHeight is used as part of positioning
  const halfLineHeight = fontSize / 2;

  // We can fit up to height / lineHeight lines in the region.
  const maxLines = height / fontSize;

  // textBase is the starting point for the text elements within the bounding rectangle.
  const lineCount = textBreak.split.length;
  const textBaseX = x + (width/2);
  const textBaseY = y + (height/2) - (halfLineHeight * (lineCount - 1));

  /************************************************************************************************/
  /* The reflow logic */

  // If state doesn't match the current text, update state.
  // TODO: Should this be inside an effect? It's got some statefulness.
  if (textBreak.base !== text) {
    setTextBreak({base: text, split: [text]});
  }

  // Attempt to fit the flow by word-breaking.
  useLayoutEffect(() => {
    /* Render-dependent values: */
    // Get the width of the current layout
    const boundingRect = textRef.current.getBBox();
    const currentTextLength = boundingRect.width;

    if (currentTextLength > width) {
      // If we are currently overflowing
      if (lineCount + 1 <= maxLines) {
        setTextBreak({base: text, split: splitText(text, lineCount+1)});
      } else {
        setOverflow(true);
      }
    } else {
      setOverflow(false);
    }
  }, [width, maxLines, lineCount, text]);
  
  /************************************************************************************************/
  /* Build the individual sub-lines */
  // Each line resets x to the base value. Every line after the first offsets y from the previous
  // line by the line height.
  const makeSpan = (line, index) => (
    <tspan x={textBaseX} dy={(index > 0) ? fontSize : 0}>{
      line
    }</tspan>
  );

  // TODO: The rect here is a debugging construct for showing the extents of this object. We should
  // probably be more aggressive about removing it rather than just making it invisible, if it's not
  // being shown.
  return (<g>
    <rect x={x} y={y} width={width} height={height} fill={ overflow ? "pink" : "none"}/>
    <text style={textStyle} dominant-baseline="middle" ref={textRef} x={textBaseX} y={textBaseY} className="panelName">{textBreak.split.map(makeSpan)}</text>
  </g>);
}

export default WrapText;