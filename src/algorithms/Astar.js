export function astar(grid, start, end,technique) {
  for (var x = 0; x < grid.length; x++) {
    for (var y = 0; y < grid[x].length; y++) {
      grid[x][y].f = 0;
      grid[x][y].g = 0;
      grid[x][y].h = 0;
      grid[x][y].previous = null;
    }
  }
  var openList = [];
  var closedList = [];
  openList.push(start);
  while (openList.length > 0) {
    // Grab the lowest f(x) to process next
    var lowInd = 0;
    for (var i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[lowInd].f) { lowInd = i; }
    }
    var currentNode = openList[lowInd];
    // End case -- result has been found, return the traced path
    if (currentNode === end) {
      var curr = currentNode;
      var path = [];
      start.previous=null;
      while (curr.previous) {
        path.push(curr);
        curr = curr.previous;
      }
      path.push(start)
     closedList.push(end);
     let consolidate=[];
     consolidate.push(closedList);
     consolidate.push(path.reverse());
      return consolidate;
    }

    // Normal case -- move currentNode from open to closed, process each of its neighbors
    openList.splice(openList.indexOf(currentNode), 1);
    currentNode.visited=true;
    closedList.push(currentNode);
    var neighbors = neighborNodes(grid, currentNode);

    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (neighbor.visited || neighbor.walled) 
      {
        // not a valid node to process, skip to next neighbor
        continue;
      }

      // g score is the shortest distance from start to current node, we need to check if
      //   the path we have arrived at this neighbor is the shortest one we have seen yet
      var gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
      var gScoreIsBest = false;


      if (openList.indexOf(neighbor) == -1) {
        // This the the first time we have arrived at this node, it must be the best
        // Also, we need to take the h (heuristic) score since we haven't done so yet
        gScoreIsBest = true;
        neighbor.h = heuristic(neighbor, end,technique);
     
        openList.push(neighbor);
      }
      else if (gScore < neighbor.g) {
        // We have already seen the node, but last time it had a worse g (distance from start)
        gScoreIsBest = true;
      }

      if (gScoreIsBest) {
        // Found an optimal (so far) path to this node.   Store info on how we got here and
        //  just how good it really is...
        neighbor.previous = currentNode;
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
      }
    }
  }

  // No result was found -- empty array signifies failure to find path
  return [];
}
function heuristic(pos0, pos1,tech) {
  // This is the Manhattan distance
   var d1 = Math.abs(pos1.row - pos0.row);
   var d2 = Math.abs(pos1.col - pos0.col);
   if(tech=="eucledian")
   return Math.sqrt(Math.pow(d1,2)+Math.pow(d2,2));
   else if(tech=="manhatten")
   return d1 + d2;
 else if(tech=='chebyshev')
 return Math.max(d1,d2);
 else
return Math.sqrt(2)*Math.min(d1,d2)+Math.abs(d1-d2);
}
function neighborNodes(grid, node) {
  var path = [];
  var x = node.row;
  var y = node.col;
  if (grid[x - 1] && grid[x - 1][y]) {
    path.push(grid[x - 1][y]);
  }
  if (grid[x + 1] && grid[x + 1][y]) {
    path.push(grid[x + 1][y]);
  }
  if (grid[x][y - 1] && grid[x][y - 1]) {
    path.push(grid[x][y - 1]);
  }
  if (grid[x][y + 1] && grid[x][y + 1]) {
    path.push(grid[x][y + 1]);
  }
  return path;
}
// binary heap or a priority queue can be used for fasster results but as the grid is of a small fixed size that does not matter that much.
//code taken from   https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/
//thanks brian grinstead