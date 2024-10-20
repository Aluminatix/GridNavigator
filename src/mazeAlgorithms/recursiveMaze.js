let walls;

export function recursiveDivisionMaze(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) return false;

  let vertical = Array.from({ length: grid[0].length }, (_, i) => i);
  let horizontal = Array.from({ length: grid.length }, (_, i) => i);
  walls = [];

  getRecursiveWalls(vertical, horizontal, grid, startNode, finishNode);
  return walls;
}

function getRecursiveWalls(vertical, horizontal, grid, startNode, finishNode) {
  if (vertical.length < 2 || horizontal.length < 2) return;

  let dir = vertical.length > horizontal.length ? 0 : 1;
  let num = dir === 0 ? getOddRandom(vertical) : getOddRandom(horizontal);

  addWall(dir, num, vertical, horizontal, startNode, finishNode);

  let [vLeft, vRight] = splitArray(vertical, num);
  let [hTop, hBottom] = splitArray(horizontal, num);

  dir === 0
    ? (getRecursiveWalls(vLeft, horizontal, grid, startNode, finishNode),
       getRecursiveWalls(vRight, horizontal, grid, startNode, finishNode))
    : (getRecursiveWalls(vertical, hTop, grid, startNode, finishNode),
       getRecursiveWalls(vertical, hBottom, grid, startNode, finishNode));
}

function getOddRandom(array) {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * array.length);
  } while (array[randomIndex] % 2 === 0);

  return array[randomIndex];
}

function splitArray(array, num) {
  let idx = array.indexOf(num);
  return [array.slice(0, idx), array.slice(idx + 1)];
}

function addWall(dir, num, vertical, horizontal, startNode, finishNode) {
  let tempWalls = [];

  if (dir === 0) {  // Horizontal wall
    for (let row of horizontal) {
      if (!isStartFinish(row, num, startNode, finishNode)) tempWalls.push([row, num]);
    }
  } else {  // Vertical wall
    for (let col of vertical) {
      if (!isStartFinish(num, col, startNode, finishNode)) tempWalls.push([num, col]);
    }
  }

  if (tempWalls.length > 0) tempWalls.splice(getRandomIndex(tempWalls.length), 1);
  walls.push(...tempWalls);
}

function isStartFinish(row, col, startNode, finishNode) {
  return (row === startNode.row && col === startNode.col) || (row === finishNode.row && col === finishNode.col);
}

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}
