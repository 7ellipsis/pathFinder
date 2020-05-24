export function bfs(grid,start,end)
{
    const visited=[];
    const bfs=[];
    bfs.push(start);
    let found=false;
while(bfs.length!=0)
{
   let node=bfs.shift();
   visited.push(node);
   node.visited=true;
   let neighbors=getNeighbors(node,grid);
   for(let x=0;x<neighbors.length;x++)
   {
       neighbors[x].visited=true;
       visited.push(neighbors[x]);
       if(neighbors[x]===end)
       {
        neighbors[x].previous=node;
          found=true;
        }
        neighbors[x].previous=node;
       bfs.push(neighbors[x]);
   }
   if(found)
   break;
}
return visited;
}
function getNeighbors(node,grid)
{
const neighbors = [];
const { row, col } = node;
if (row > 0)
    neighbors.push(grid[row - 1][col]);
if (row < grid.length - 1)
    neighbors.push(grid[row + 1][col]);
if (col > 0)
    neighbors.push(grid[row][col - 1]);
if (col < grid[0].length - 1)
    neighbors.push(grid[row][col + 1]);
return neighbors.filter(neighbor => !neighbor.visited && !neighbor.walled);
}

export function getShortestPathbfs(end) {
    const nodes = [];
    let current = end;
    while (current !== null) {
        nodes.unshift(current);
        current = current.previous;
    }
    return nodes;
}