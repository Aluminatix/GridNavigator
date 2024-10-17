function fisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at indices i and j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


export function randomMaze(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
      return false;
    }
    let walls = [];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (
          (row === startNode.row && col === startNode.col) ||
          (row === finishNode.row && col === finishNode.col)
        )
          continue;
        if (Math.random() < 0.33) {
          walls.push([row, col]);
        }
      }
    }

    walls = fisherYatesShuffle(walls);
    return walls;
  }

