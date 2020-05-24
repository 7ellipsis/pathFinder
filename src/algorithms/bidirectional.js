export function bidirectionalSearch(grid, start,end) {
    const visitedNodesInOrder = [];
    let q1 = [], q2 = [];
    let path1=[];
    let path2=[];
    let one=[];
    let two=[];
    let finish=false;
    q1.push(start);
    q2.push(end);
    let visited = [];
    for (let i = 0; i < grid.length; ++i) {
        let tmp = [];
        for (let j = 0; j < grid[0].length; ++j)
            tmp.push(false);
        visited.push(tmp);
    }
    while (q1.length || q2.length) {
        const ele1=q1.shift();
        const ele2=q2.shift();
        ele1.visited=true;
        ele2.visited=true;
        visitedNodesInOrder.push(ele1);
        visitedNodesInOrder.push(ele2);
        let neighbor1 = getNeighbors(ele1,grid);
        let neighbor2 = getNeighbors(ele2,grid);
        for (let i = 0; i < 4; i++) {
                if (neighbor1[i]) {
                        visitedNodesInOrder.push(neighbor1[i]);
                        one.push(neighbor1);
                        neighbor1[i].visited = true;
                        neighbor1[i].previous = ele1;
                        if(visited[neighbor1[i].row][neighbor1[i].col])
                        {
                            let current=neighbor1[i];
    while(current.previous)
    {
        path1.push(current);
        current=neighbor1[i].previous;
    }
                           finish=true;
                        }
                        visited[neighbor1[i].row][neighbor1[i].col]=true;
                    q1.push(neighbor1[i]);
                }
                if (neighbor2[i]) {
                        visitedNodesInOrder.push(neighbor2[i]);
                        neighbor2[i].visited = true;
                        neighbor2[i].previous = ele2;
                        if(visited[neighbor2[i].row][neighbor2[i].col])
                        {
                            let current=neighbor2[i];
                            while(current.previous)
                            {
                                path2.push(current);
                                current=neighbor2[i].previous;
                            }
                           finish=true;
                        }
                        visited[neighbor2[i].row][neighbor2[i].col]=true;
                    q2.push(neighbor2[i]);
                }
        }
        if(finish)
        break;
    }
    
   
   path1=path1.reverse();
   path1.push(...path2);
    return [visitedNodesInOrder,path1];
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