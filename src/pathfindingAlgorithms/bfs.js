export function breadthFirstSearch(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) return false;
  
    let unvisitedNodes = [];
    let visitedNodesInOrder = [];
    let inQueue = new Set();  // To track nodes already in the queue
    
    unvisitedNodes.push(startNode);
    inQueue.add(startNode);
  
    while (unvisitedNodes.length !== 0) {
      let closestNode = unvisitedNodes.shift();
      if (closestNode.isWall) continue;
      if (closestNode === finishNode) return visitedNodesInOrder;
  
      visitedNodesInOrder.push(closestNode);
      closestNode.isVisited = true;
  
      let unvisitedNeighbours = getUnvisitedNeighbours(closestNode, grid);
      for (let unvisitedNeighbour of unvisitedNeighbours) {
        unvisitedNeighbour.previousNode = closestNode;
        if (!inQueue.has(unvisitedNeighbour)) {
          unvisitedNodes.push(unvisitedNeighbour);
          inQueue.add(unvisitedNeighbour);  // Ensure it doesn't re-enter the queue
        }
      }
    }
    return visitedNodesInOrder;
  }

  function getUnvisitedNeighbours(node, grid) {
    let neighbours = [];
    let { row, col } = node;
  
    // Directions array: [deltaRow, deltaCol]
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1] ];
  
    // Loop through each direction
    for (let i = 0; i < directions.length; i++) {
      const newRow = row + directions[i][0];
      const newCol = col + directions[i][1];
  
      // Check if the new position is within bounds
      if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length){
        neighbours.push(grid[newRow][newCol]);
      }
    }
  
    // Filter out visited neighbours
    return neighbours.filter((neighbour) => !neighbour.isVisited);
  }

  export function getNodesInShortestPathOrderBFS(finishNode) {
    let nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }