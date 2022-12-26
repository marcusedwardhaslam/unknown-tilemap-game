import { Tile } from "./tile";

interface Position {
  x: number;
  y: number;
}

interface GraphNode extends Position {
  g: number;
  f: number;
  h: number;
  tile: Tile;
  parent: GraphNode | null;
  closed: boolean;
  visited: boolean;
}

function manhattan(start: GraphNode, end: GraphNode) {
  const d1 = Math.abs (end.x - start.x);
  const d2 = Math.abs (end.y - start.y);
  return d1 + d2;
}

function findNeighbours(graph: GraphNode[][], node: GraphNode): GraphNode[] {
  const neighbours: GraphNode[] = [];
  const { x, y } = node;
  if (graph[y] && graph[y][x - 1]) {
    neighbours.push(graph[y][x - 1]);
  }
  if (graph[y] && graph[y][x + 1]) {
    neighbours.push(graph[y][x + 1]);
  }
  if (graph[y - 1] && graph[y-1][x]) {
    neighbours.push(graph[y - 1][x]);
  }
  if (graph[y + 1] && graph[y + 1][x]) {
    neighbours.push(graph[y + 1][x]);
  }
  return neighbours;
}

function initGraph(grid: Tile[][]): GraphNode[][] {
  const graph: GraphNode[][] = [];
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
        closed: false,
        visited: false,
      });
    }
  }
  return graph;
}

export function aStar(grid: Tile[][], beginning: Position, end: Position) {
  const graph = initGraph(grid);
  const goal = {
    x: end.x,
    y: end.y,
    g: 0,
    f: 0,
    h: 0,
    tile: grid[end.y][end.x],
    parent: null,
    closed: false,
    visited: false,
  };
  const start = {
    x: beginning.x,
    y: beginning.y,
    g: 0,
    f: 0,
    h: 0,
    tile: grid[beginning.y][beginning.x],
    parent: null,
    closed: false,
    visited: false,
  };
  const open: GraphNode[] = [start];

  while (open.length) {
    let lowestPossibleIndex = 0;
    for (let i = 0; i < open.length; i++) {
      if (open[i].f < open[lowestPossibleIndex].f) {
        lowestPossibleIndex = i;
      }
    }

    const currentNode = open[lowestPossibleIndex];

    if (currentNode.x == end.x && currentNode.y == end.y) {
      let currentSearchNode = currentNode;
      const route = [];
      while (currentSearchNode.parent) {
        route.push(currentSearchNode);
        currentSearchNode = currentSearchNode.parent;
      }
      route.push(start);
      return route.reverse();
    }

    open.splice(lowestPossibleIndex, 1);
    currentNode.closed = true;

    const neighbours = findNeighbours(graph, currentNode);
    for (const neighbour of neighbours) {
      if (neighbour.closed || !neighbour.tile.isPath()) {
          continue;
      }

      const gScore = currentNode.g + 1;
      let gScoreIsBest = false;

      if (!neighbour.visited) {
        gScoreIsBest = true;
        neighbour.h = manhattan(neighbour, goal);
        neighbour.visited = true;
        open.push(neighbour);
      } else if (gScore < neighbour.g) {
        gScoreIsBest = true;
      }

      if (gScoreIsBest) {
        neighbour.parent = currentNode;
        neighbour.g = gScore;
        neighbour.f = neighbour.g + neighbour.h;
      }
    }
  }
  
  return [];
}
