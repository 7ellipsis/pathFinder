export function dfs(grid, start, end) {
    const visited = [];
    depth(start.row, start.col, grid, visited, end);
    return visited;
}
function depth(row, col, grid, visited, stop) {
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col].visited || grid[row][col].walled)
        return;
    let node = grid[row][col];
    node.visited = true;
    visited.push(node);
    if (node == stop)
        return 1;
    return depth(row, col - 1, grid, visited, stop) || depth(row + 1, col, grid, visited, stop) || depth(row, col + 1, grid, visited, stop) || depth(row - 1, col, grid, visited, stop);
}
