export function dijkstra(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
      return false;
    }
  
    startNode.distance = 0;
  
    // Create a priority queue using a min-heap
    const unvisitedNodes = new MinHeap();
    unvisitedNodes.insert(startNode);
  
    const visitedNodesInOrder = [];
  
    while (!unvisitedNodes.isEmpty()) {
      const closestNode = unvisitedNodes.extractMin();
  
      if (closestNode.isWall) continue;
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      if (closestNode === finishNode) return visitedNodesInOrder;
  
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
  
      updateUnvisitedNeighbours(closestNode, grid, unvisitedNodes);
    }
  
    return visitedNodesInOrder;
  }
  
  function updateUnvisitedNeighbours(node, grid, unvisitedNodes) {
    const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
  
    for (const unvisitedNeighbour of unvisitedNeighbours) {
      const newDistance = node.distance + 1;
  
      // Only update if a shorter path is found
      if (newDistance < unvisitedNeighbour.distance) {
        unvisitedNeighbour.distance = newDistance;
        unvisitedNeighbour.previousNode = node;
  
        // If the neighbour is not already in the priority queue, insert it
        if (!unvisitedNodes.contains(unvisitedNeighbour)) {
          unvisitedNodes.insert(unvisitedNeighbour);
        } else {
          unvisitedNodes.decreaseKey(unvisitedNeighbour);
        }
      }
    }
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
  
  // MinHeap Implementation
  class MinHeap {
    constructor() {
      this.nodes = [];
    }
  
    insert(node) {
      this.nodes.push(node);
      this.bubbleUp();
    }
  
    extractMin() {
      if (this.nodes.length === 0) return null;
  
      const minNode = this.nodes[0];
      const endNode = this.nodes.pop();
      
      if (this.nodes.length > 0) {
        this.nodes[0] = endNode;
        this.sinkDown();
      }
      
      return minNode;
    }
  
    bubbleUp() {
      let index = this.nodes.length - 1;
      const node = this.nodes[index];
  
      while (index > 0) {
        let parentIndex = Math.floor((index - 1) / 2);
        let parent = this.nodes[parentIndex];
  
        if (node.distance >= parent.distance) break;
  
        this.nodes[index] = parent;
        index = parentIndex;
      }
  
      this.nodes[index] = node;
    }
  
    sinkDown() {
      let index = 0;
      const length = this.nodes.length;
      const node = this.nodes[0];
  
      while (true) {
        let leftChildIndex = 2 * index + 1;
        let rightChildIndex = 2 * index + 2;
        let leftChild, rightChild;
        let swap = null;
  
        if (leftChildIndex < length) {
          leftChild = this.nodes[leftChildIndex];
          if (leftChild.distance < node.distance) {
            swap = leftChildIndex;
          }
        }
  
        if (rightChildIndex < length) {
          rightChild = this.nodes[rightChildIndex];
          if (
            (swap === null && rightChild.distance < node.distance) ||
            (swap !== null && rightChild.distance < leftChild.distance)
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
  
    isEmpty() {
      return this.nodes.length === 0;
    }
  
    contains(node) {
      return this.nodes.includes(node);
    }
  
    decreaseKey(node) {
      const index = this.nodes.indexOf(node);
      this.bubbleUp(index);
    }
  }
  
  export function getNodesInShortestPathOrderDijkstra(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
  
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
  
    return nodesInShortestPathOrder;
  }
  