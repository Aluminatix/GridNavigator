export function astar(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
      return false;
    }
    
    startNode.distance = 0;
    startNode.totalDistance = manhattanDistance(startNode, finishNode);
    
    const openSet = new MinHeap();
    openSet.insert(startNode);
    const visitedNodesInOrder = [];
  
    while (!openSet.isEmpty()) {
      const closestNode = openSet.extractMin();
  
      if (closestNode.isWall) continue;
      if (closestNode === finishNode) return visitedNodesInOrder;
  
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
  
      const neighbours = getNeighbours(closestNode, grid);
      for (const neighbour of neighbours) {
        const distance = closestNode.distance + 1;
  
        if (distance < neighbour.distance) {
          neighbour.distance = distance;
          neighbour.totalDistance = distance + manhattanDistance(neighbour, finishNode);
          neighbour.previousNode = closestNode;
  
          if (!openSet.contains(neighbour)) {
            openSet.insert(neighbour);
          } else {
            // Reorder the heap to reflect the new total distance
            openSet.update(neighbour);
          }
        }
      }
    }
    return visitedNodesInOrder;
  }
  
  function getNeighbours(node, grid) {
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
  
  function manhattanDistance(node, finishNode) {
    return Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col);
  }
  
  export function getNodesInShortestPathOrderAstar(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
  
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    
    return nodesInShortestPathOrder;
  }
  
  // MinHeap implementation for the priority queue
  class MinHeap {
    constructor() {
      this.nodes = [];
    }
  
    insert(node) {
      this.nodes.push(node);
      this.bubbleUp();
    }
  
    extractMin() {
      const minNode = this.nodes[0];
      const end = this.nodes.pop();
      if (this.nodes.length > 0) {
        this.nodes[0] = end;
        this.bubbleDown();
      }
      return minNode;
    }
  
    isEmpty() {
      return this.nodes.length === 0;
    }
  
    contains(node) {
      return this.nodes.includes(node);
    }
  
    update(node) {
      // Reinsert the node to maintain the heap property
      this.bubbleDown(node);
    }
  
    bubbleUp() {
      let index = this.nodes.length - 1;
      const node = this.nodes[index];
      
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        const parent = this.nodes[parentIndex];
        
        if (node.totalDistance >= parent.totalDistance) break;
  
        this.nodes[index] = parent;
        index = parentIndex;
      }
      this.nodes[index] = node;
    }
  
    bubbleDown() {
      let index = 0;
      const length = this.nodes.length;
      const node = this.nodes[index];
  
      while (true) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let leftChild, rightChild;
        let swap = null;
  
        if (leftChildIndex < length) {
          leftChild = this.nodes[leftChildIndex];
          if (leftChild.totalDistance < node.totalDistance) {
            swap = leftChildIndex;
          }
        }
  
        if (rightChildIndex < length) {
          rightChild = this.nodes[rightChildIndex];
          if (
            (swap === null && rightChild.totalDistance < node.totalDistance) ||
            (swap !== null && rightChild.totalDistance < leftChild.totalDistance)
          ) {
            swap = rightChildIndex;
          }
        }
  
        if (swap === null) break;
  
        this.nodes[index] = this.nodes[swap];
        index = swap;
      }
      this.nodes[index] = node;
    }
  }
  