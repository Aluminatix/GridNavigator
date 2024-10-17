export function depthFirstSearch(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
      return false;
    }
  
    const stack = [];                
    const visitedNodesInOrder = [];
  
    stack.push(startNode);
  
    while (stack.length > 0) {
      const currentNode = stack.pop();
  
      if (currentNode.isWall) continue; 
      if (currentNode.isVisited) continue; 
      if (currentNode === finishNode) return visitedNodesInOrder; 
  
      currentNode.isVisited = true;    
      visitedNodesInOrder.push(currentNode);
  
      const unvisitedNeighbours = getUnvisitedNeighbours(currentNode, grid);
      for (let neighbour of unvisitedNeighbours) {
        neighbour.previousNode = currentNode; 
        stack.push(neighbour);
      }
    }
  
    return visitedNodesInOrder; 
  }
  
  function getUnvisitedNeighbours(node, grid) {
    const neighbours = [];
    const { row, col } = node;
  
   
    const directions = [[0, -1], [-1, 0], [0, 1], [1, 0] ];
  
    for (let [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
  
      // Check if the new position is within grid bounds
      if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
        const neighbourNode = grid[newRow][newCol];
        // Add only unvisited and non-wall neighbours
        if (!neighbourNode.isVisited && !neighbourNode.isWall) {
          neighbours.push(neighbourNode);
        }
      }
    }
  
    return neighbours; 
  }
  
  export function getNodesInShortestPathOrderDFS(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
  
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
  
    return nodesInShortestPathOrder;
  }
  