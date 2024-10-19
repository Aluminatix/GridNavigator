

const PathfindingVisualizer = () => {

    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [visualizingAlgorithm, setVisualizingAlgorithm] = useState(false);
    const [generatingMaze, setGeneratingMaze] = useState(false);
    const [dimensions, setDimensions] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const [speed, setSpeed] = useState(10);
    const [mazeSpeed, setMazeSpeed] = useState(10);
  
    useEffect(() => {
      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      };
  
      window.addEventListener("resize", handleResize);
      setGrid(getInitialGrid(initialNumRows, initialNumColumns));
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // updateSpeed = (path, maze) => {
    //     setSpeed(path);
    //     setMazeSpeed(maze);
    // };
  
    const handleMouseDown = (row, col) => {
      const newGrid = getNewGridWithWalls(grid, row, col);
      setGrid(newGrid);
      setMouseIsPressed(true);
    };
  
    const handleMouseEnter = (row, col) => {
      if (mouseIsPressed) {
        const newGrid = getNewGridWithWalls(grid, row, col);
        setGrid(newGrid);
      }
    };
  
    const handleMouseUp = () => {
      setMouseIsPressed(false);
    };
  
    const clearGrid = () => {
      if (visualizingAlgorithm || generatingMaze) return;

      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
          if (
            !(
              (row === startNodeRow && col === startNodeCol) ||
              (row === finishNodeRow && col === finishNodeCol)
            )
          ) {
            document.getElementById(`node-${row}-${col}`).className = "node";
          }
        }
      }
  
      const newGrid = getInitialGrid(initialNumRows, initialNumColumns);
      setGrid(newGrid);
      setVisualizingAlgorithm(false);
      setGeneratingMaze(false);
  
    //   document.querySelectorAll(".node").forEach((node) => {
    //     node.className = "node";
    //   });
  
    //   // Re-assign start and finish node classes after clearing grid
    //   document
    //     .getElementById(`node-${startNodeRow}-${startNodeCol}`)
    //     .classList.add("node-start");
    //   document
    //     .getElementById(`node-${finishNodeRow}-${finishNodeCol}`)
    //     .classList.add("node-finish");
  
    //   setVisualizingAlgorithm(false);
    //   setGeneratingMaze(false);
    };
  
    const clearPath = () => {
      if (visualizingAlgorithm || generatingMaze) return;
      
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
          if (
            document.getElementById(`node-${row}-${col}`).className ===
            "node node-shortest-path"
          ) {
            document.getElementById(`node-${row}-${col}`).className = "node";
          }
        }
      }

    const newGrid = getGridWithoutPath(grid);
    setGrid(newGrid);
    setVisualizingAlgorithm(false);
    setGeneratingMaze(false);
    // this.setState({
    //   grid: newGrid,
    //   visualizingAlgorithm: false,
    //   generatingMaze: false,
    // });

    //   const newGrid = grid.map((row) =>
    //     row.map((node) => {
    //       if (node.isVisited || node.isShortestPath) {
    //         node.isVisited = false;
    //         node.isShortestPath = false;
    //       }
    //       return node;
    //     })
    //   );
    //   setGrid(newGrid);
  
    //   // Clear path-related classes
    //   document.querySelectorAll(".node-visited").forEach((node) => {
    //     node.classList.remove("node-visited");
    //   });
    //   document.querySelectorAll(".node-shortest-path").forEach((node) => {
    //     node.classList.remove("node-shortest-path");
    //   });
  
    //   // Re-assign start and finish node classes after clearing path
    //   document
    //     .getElementById(`node-${startNodeRow}-${startNodeCol}`)
    //     .classList.add("node-start");
    //   document
    //     .getElementById(`node-${finishNodeRow}-${finishNodeCol}`)
    //     .classList.add("node-finish");
  
    //   setVisualizingAlgorithm(false);
    //   setGeneratingMaze(false);
    };
  
    const animateShortestPath = (nodesInShortestPathOrder, visitedNodesInOrder) => {
      
      if (nodesInShortestPathOrder.length === 1)
            setVisualizingAlgorithm(false);
      for (let i = 1; i < nodesInShortestPathOrder.length; i++){
        if (i === nodesInShortestPathOrder.length - 1) {
          setTimeout(() => {
            let updatedGrid = updateNodesForRender(grid, nodesInShortestPathOrder, visitedNodesInOrder);
            setGrid(updatedGrid);
            setVisualizingAlgorithm(false);
          }, i * 3 * speed);
          return;
        }

        let node = nodesInShortestPathOrder[i];
        setTimeout(() => {
          //shortest path node
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
        }, i * (3 * speed));
      }
    };
  
    const animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        let newGrid = grid.slice();
        for (let row of newGrid) {
          for (let node of row) {
            let newNode = {
              ...node,
              isVisited: false,
            };
            newGrid[node.row][node.col] = newNode;
          }
        }
        setGrid(newGrid);

        for (let i = 1; i <= visitedNodesInOrder.length; i++) {
          let node = visitedNodesInOrder[i];
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
            //   this.animateShortestPath(
            //     nodesInShortestPathOrder,
            //     visitedNodesInOrder
            //   );
            animateShortestPath(nodesInShortestPathOrder, visitedNodesInOrder);
            }, i * speed);
            return;
          }
          setTimeout(() => {
            //visited node
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-visited";
          }, i * speed);
        }
    };
  
    const visualizeAlgorithm = (algorithm, getNodesInShortestPathOrder) => {
      if (visualizingAlgorithm || generatingMaze) return;

      setVisualizingAlgorithm(true);

      setTimeout(()=>{
        const startNode = grid[startNodeRow][startNodeCol];
        const finishNode = grid[finishNodeRow][finishNodeCol];
        const visitedNodesInOrder = algorithm(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
      }, speed);

    //   const startNode = grid[startNodeRow][startNodeCol];
    //   const finishNode = grid[finishNodeRow][finishNodeCol];
    //   const visitedNodesInOrder = algorithm(grid, startNode, finishNode);
    //   const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    //   animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    };

    const animateMaze = (walls) => {
        // walls.forEach((wall, i) => {
        //   setTimeout(() => {
        //     document.getElementById(`node-${wall[0]}-${wall[1]}`).classList.add("node-wall-animated");
        //     if (i === walls.length - 1) {
        //       setGeneratingMaze(false);
        //     }
        //   }, i * mazeSpeed);
        // });
        for (let i = 0; i <= walls.length; i++) {
            if (i === walls.length) {
              setTimeout(() => {
                clearGrid();
                let newGrid = getNewGridWithMaze(grid, walls);
                setGrid(newGrid);
                setGeneratingMaze(false);
                // this.setState({ grid: newGrid, generatingMaze: false });
              }, i * mazeSpeed);
              return;
            }
            let wall = walls[i];
            let node = grid[wall[0]][wall[1]];
            setTimeout(() => {
              //Walls
              document.getElementById(`node-${node.row}-${node.col}`).className =
                "node node-wall-animated";
            }, i * mazeSpeed);
          }
    };
  
    const generateRandomMaze = () => {
      if (visualizingAlgorithm || generatingMaze) return;
  
      setGeneratingMaze(true);
      setTimeout(()=>{
        const startNode = grid[startNodeRow][startNodeCol];
        const finishNode = grid[finishNodeRow][finishNodeCol];
        const walls = randomMaze(grid, startNode, finishNode);
        animateMaze(walls);
      }, mazeSpeed);
      
    };
  
    return (
      <React.Fragment>
        <NavBar
          visualizingAlgorithm={visualizingAlgorithm}
          generatingMaze={generatingMaze}
          visualizeDijkstra={() => visualizeAlgorithm(dijkstra, getNodesInShortestPathOrderDijkstra)}
          visualizeAStar={() => visualizeAlgorithm(astar, getNodesInShortestPathOrderAstar)}
          visualizeBFS={() => visualizeAlgorithm(breadthFirstSearch, getNodesInShortestPathOrderBFS)}
          visualizeDFS={() => visualizeAlgorithm(depthFirstSearch, getNodesInShortestPathOrderDFS)}
          generateRandomMaze={generateRandomMaze}
          clearGrid={clearGrid}
          clearPath={clearPath}
          updateSpeed={(pathSpeed, mazeSpeed) => {
            setSpeed(pathSpeed);
            setMazeSpeed(mazeSpeed);
          }}
        />
        <div className={visualizingAlgorithm || generatingMaze ? "grid-visualizing" : "grid"}>
          {grid.map((row, rowId) => (
            <div key={rowId}>
              {row.map((node, nodeId) => (
                <Node
                  key={nodeId}
                  {...node}
                  onMouseDown={() => handleMouseDown(node.row, node.col)}
                  onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                  onMouseUp={handleMouseUp}
                  width={dimensions.width}
                  height={dimensions.height}
                  numRows={initialNumRows}
                  numColumns={initialNumColumns}
                />
              ))}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  };