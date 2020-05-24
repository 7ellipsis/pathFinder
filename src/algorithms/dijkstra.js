export function dijkstra(grid, start, end) {
    const visited = [];
    start.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodes(unvisitedNodes);
        const closest = unvisitedNodes.shift();
        if (closest.walled)
            continue;
        if (closest.distance === Infinity)
            return visited;
        closest.visited = true;
        visited.push(closest);
        if (closest === end)
            return visited;
        updateUnvisited(closest, grid);

    }
}
function updateUnvisited(node, grid) {
    const unvisited = getUnvisitedNeighbors(node, grid);
    for (let n of unvisited) {
        n.distance = node.distance + 1;
        n.previous = node;
    }
}
function getUnvisitedNeighbors(node, grid) {
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
    return neighbors.filter(neighbor => !neighbor.visited);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}
function sortNodes(unvisitedNodes) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
}

export function getShortestPath(end) {
    const nodes = [];
    let current = end;
    while (current !== null) {
        nodes.unshift(current);
        current = current.previous;
    }
    return nodes;
}