import React, { useState } from "react";
import "./navbar.css";
import walk from '../assets/walk.gif';


const Heading = window.innerWidth > 600 ? "Pathfinding Visualizer" : "Pathfinder";

const NavBar = (props) => {
  const [algorithm, setAlgorithm] = useState("Visualize Algorithm");
  const [maze, setMaze] = useState("Generate Maze");
  const [pathState, setPathState] = useState(false);
  const [mazeState, setMazeState] = useState(false);
  const [speedState, setSpeedState] = useState("Speed");

  const selectAlgorithm = (selection) => {
    if (props.visualizingAlgorithm) return;
    if (
      selection === algorithm ||
      algorithm === "Visualize Algorithm" ||
      algorithm === "Select an Algorithm!"
    ) {
      setAlgorithm(selection);
    } else if (pathState) {
      clearPath();
      setAlgorithm(selection);
    } else {
      setAlgorithm(selection);
    }
  };

  const selectMaze = (selection) => {
    if (props.visualizingAlgorithm || props.generatingMaze) return;
    if (
      selection === maze ||
      maze === "Generate Maze" ||
      maze === "Select a Maze!"
    ) {
      setMaze(selection);
    } else if (!mazeState) {
      setMaze(selection);
    } else {
      clearGrid();
      setMaze(selection);
    }
  };

  const visualizeAlgorithm = () => {
    if (props.visualizingAlgorithm || props.generatingMaze) return;
    if (pathState) {
      clearTemp();
      return;
    }
    if (algorithm === "Visualize Algorithm" || algorithm === "Select an Algorithm!") {
      setAlgorithm("Select an Algorithm!");
    } else {
      setPathState(true);
      switch (algorithm) {
        case "Visualize Dijkstra":
          props.visualizeDijkstra();
          break;
        case "Visualize A*":
          props.visualizeAStar();
          break;
        case "Visualize Breadth First Search":
          props.visualizeBFS();
          break;
        case "Visualize Depth First Search":
          props.visualizeDFS();
          break;
        
        default:
          break;
      }
    }
  };

  const generateMaze = () => {
    if (props.visualizingAlgorithm || props.generatingMaze) return;
    if (mazeState || pathState) {
      clearTemp();
    }
    if (maze === "Generate Maze" || maze === "Select a Maze!") {
      setMaze("Select a Maze!");
    } else {
      setMazeState(true);
      switch (maze) {
        case "Generate Random Maze":
          props.generateRandomMaze();
          break;
        case "Generate Recursive Maze":
          props.generateRecursiveMaze();
          break;
        default:
          break;
      }
    }
  };

  const clearGrid = () => {
    if (props.visualizingAlgorithm || props.generatingMaze) return;
    props.clearGrid();
    setAlgorithm("Visualize Algorithm");
    setMaze("Generate Maze");
    setPathState(false);
    setMazeState(false);
  };

  const clearPath = () => {
    if (props.visualizingAlgorithm || props.generatingMaze) return;
    props.clearPath();
    setPathState(false);
    setMazeState(false);
  };

  const clearTemp = () => {
    if (props.visualizingAlgorithm || props.generatingMaze) return;
    props.clearGrid();
    setPathState(false);
    setMazeState(false);
  };

  const changeSpeed = (speed) => {
    if (props.visualizingAlgorithm || props.generatingMaze) return;
    let value = [10, 10];
    if (speed === "Slow") value = [50, 30];
    else if (speed === "Medium") value = [25, 20];
    else if (speed === "Fast") value = [10, 10];
    setSpeedState(speed);
    props.updateSpeed(value[0], value[1]);
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div
        className="navbar-brand h1 mb-0"
      >
        {Heading}
        <img src={walk} alt="walk gif" className="walk-gif" />

      </div>

      <div className="navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="dropdownMenu1"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Algorithms
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                {["Visualize Dijkstra", "Visualize A*", "Visualize Breadth First Search", "Visualize Depth First Search", ].map((algo) => (
                  <li key={algo}>
                    <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => selectAlgorithm(algo)}
                  >
                    {algo.replace("Visualize ", "")}
                  </button>
                  </li>
                  
                ))}
              </ul>
            </div>{" "}
          </li>
          <li>
            <button
              type="button"
              className="btn btn-success"
              onClick={visualizeAlgorithm}
            >
              {algorithm}
            </button>
          </li>
          <li className="nav-item dropdown">
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="dropdownMenu1"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Mazes
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                {["Generate Random Maze", "Generate Recursive Maze"].map((mazeOption) => (
                  <li key={mazeOption}>
                    <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => selectMaze(mazeOption)}
                  >
                    {mazeOption.replace("Generate ", "")}
                  </button>
                  </li>
                  
                ))}
              </ul>
            </div>{" "}
          </li>
          <li>
            <button
              type="button"
              className="btn btn-success"
              onClick={generateMaze}
            >
              {maze}
            </button>
          </li>
          <li>
            <button
              type="button"
              className="btn btn-danger"
              onClick={clearGrid}
            >
              Clear Grid
            </button>
          </li>
          <li>
            <button
              type="button"
              className="btn btn-danger"
              onClick={clearPath}
            >
              Clear Path
            </button>
          </li>
          <li className="nav-item dropdown">
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="dropdownMenu1"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {speedState}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                {["Slow", "Medium", "Fast"].map((speed) => (
                  <li key={speed}>
                    <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => changeSpeed(speed)}
                  >
                    {speed}
                  </button>
                  </li>
                  
                ))}
              </ul>
            </div>{" "}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
