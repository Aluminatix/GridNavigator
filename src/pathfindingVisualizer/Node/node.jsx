import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faFlagCheckered } from '@fortawesome/free-solid-svg-icons'; // Importing icons
import "./node.css";

const Node = ({
  row,
  col,
  isStart,
  isFinish,
  isWall,
  isVisited,
  isShortest,
  onMouseEnter,
  onMouseDown,
  onMouseUp,
  width,
  height,
  numRows,
  numColumns,
}) => {
  // Determine the extra class based on the node's state
  const extraClass = isStart
    ? "node node-start"
    : isFinish
    ? "node node-finish"
    : isWall
    ? "node-wall"
    : isShortest
    ? "node node-shortest-path"
    : isVisited
    ? "node node-visited"
    : "node";

  // Calculate cell dimensions
  const cellWidth = Math.floor((width - 15) / numColumns);
  let cellHeight;

  if (width > 1500) {
    cellHeight = Math.floor((height - 70) / numRows);
  } else if (width > 1000) {
    cellHeight = Math.floor((height - 70) / numRows);
  } else if (width > 500) {
    cellHeight = Math.floor((height - 60) / numRows);
  } else if (width > 0) {
    cellHeight = Math.floor((height - 50) / numRows);
  }

  return (
    <div
      id={`node-${row}-${col}`}
      className={`${extraClass}`}
      style={{ "--width": `${cellWidth}px`, "--height": `${cellHeight}px` }}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseUp={() => onMouseUp()}
    >
      {/* {isStart && (
        <FontAwesomeIcon icon="fa-solid fa-location-dot" style={{color: "#63E6BE",}} />
      )}
      {isFinish && (
        <FontAwesomeIcon icon="fa-solid fa-house" />
      )} */}

    </div>
  );
};

export default Node;
