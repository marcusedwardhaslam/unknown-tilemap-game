function manhattan(start, end) {
    const d1 = Math.abs(start.x - end.x);
    const d2 = Math.abs(start.y - end.y);
    return d1 + d2;
}
function findNeighbours(graph, node) {
    const neighbours = [];
    const { x, y } = node;
    // East
    if (graph[y] && graph[y][x - 1]) {
        neighbours.push(graph[y][x - 1]);
    }
    // West
    if (graph[y] && graph[y][x + 1]) {
        neighbours.push(graph[y][x + 1]);
    }
    // North
    if (graph[y - 1] && graph[y - 1][x]) {
        neighbours.push(graph[y - 1][x]);
    }
    // South
    if (graph[y + 1] && graph[y + 1][x]) {
        neighbours.push(graph[y + 1][x]);
    }
    // // North East
    // if (graph[y - 1] && graph[y - 1][x - 1]) {
    //   neighbours.push(graph[y - 1][x - 1]);
    // }
    // // North West
    // if (graph[y - 1] && graph[y - 1][x - 1]) {
    //   neighbours.push(graph[y - 1][x - 1]);
    // }
    // // South East
    // if (graph[y + 1] && graph[y + 1][x + 1]) {
    //   neighbours.push(graph[y + 1][x + 1]);
    // }
    // // South West
    // if (graph[y + 1] && graph[y + 1][x - 1]) {
    //   neighbours.push(graph[y + 1][x - 1]);
    // }
    return neighbours;
}
function initGraph(grid) {
    const graph = [];
    for (let y = 0; y < grid.length; y++) {
        graph.push([]);
        for (let x = 0; x < grid[y].length; x++) {
            graph[y].push({
                x,
                y,
                g: 0,
                f: 0,
                h: 0,
                tile: grid[y][x],
                parent: null,
            });
        }
    }
    return graph;
}
const findInList = (needle, list) => list.find(haystack => haystack.x === needle.x && haystack.y === needle.y);
export function aStar(grid, beginning, end) {
    const graph = initGraph(grid);
    const goal = {
        x: end.x,
        y: end.y,
        g: 0,
        f: 0,
        h: 0,
        tile: grid[end.y][end.x],
        parent: null,
    };
    const start = {
        x: beginning.x,
        y: beginning.y,
        g: 0,
        f: 0,
        h: 0,
        tile: grid[beginning.y][beginning.x],
        parent: null,
    };
    const open = [start];
    const closed = [];
    while (open.length) {
        const orderedOpen = open.sort((a, b) => a.f - b.f || a.h - b.h);
        const current = orderedOpen.splice(0, 1)[0];
        // Path found... Return route.
        if (current.x == end.x && current.y == end.y) {
            let currentSearchNode = current;
            const route = [];
            while (currentSearchNode.parent !== null) {
                route.push(currentSearchNode);
                currentSearchNode = currentSearchNode.parent;
            }
            return route.reverse();
        }
        closed.push(current);
        const neighbours = findNeighbours(graph, current);
        for (const neighbour of neighbours) {
            // Is neighbour already closed?
            if (findInList(neighbour, closed) || !neighbour.tile.isPath()) {
                continue;
            }
            // cost of movement is always 1
            const gScore = current.g + 1;
            let gScoreIsBest = false;
            // If neighbour not in open, we can calculate it's score.
            if (!findInList(neighbour, open)) {
                gScoreIsBest = true;
                neighbour.h = manhattan(neighbour, goal);
                open.push(neighbour);
            }
            else if (gScore < neighbour.g) {
                gScoreIsBest = true;
            }
            if (gScoreIsBest) {
                neighbour.parent = current;
                neighbour.g = gScore;
                neighbour.f = neighbour.g + neighbour.h;
                open.push(neighbour);
            }
        }
    }
    return [];
}
