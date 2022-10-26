// https://structy.net/problems/shortest-path

type Edge = string[];
type GraphNode = string;
type Distance = number;
type GraphAdjacenyList = Record<GraphNode, GraphNode[]>;
type NodeDistanceTuple = [GraphNode, Distance];

const shortestPath = (
  edges: Edge[],
  nodeA: GraphNode,
  nodeB: GraphNode
): Distance => {
  const adjacencyList = buildAdjacenyList(edges);
  const visitedNodes = new Set<GraphNode>([nodeA]);
  const queue: NodeDistanceTuple[] = [[nodeA, 0]];

  while (queue.length > 0) {
    const nextItem = queue.shift();
    if (nextItem) {
      const [currentNode, distance] = nextItem;

      if (currentNode === nodeB) {
        return distance;
      }

      for (let neighbour of adjacencyList[currentNode]) {
        if (!visitedNodes.has(neighbour)) {
          visitedNodes.add(neighbour);
          queue.push([neighbour, distance + 1]);
        }
      }
    }
  }

  return -1;
};

const buildAdjacenyList = (edges: Edge[]): GraphAdjacenyList => {
  const adjacencyList: Record<GraphNode, GraphNode[]> = {};

  for (let edge of edges) {
    const [startNode, connectedNode] = edge;
    if (!(startNode in adjacencyList)) {
      adjacencyList[startNode] = [];
    }
    if (!(connectedNode in adjacencyList)) {
      adjacencyList[connectedNode] = [];
    }
    adjacencyList[startNode].push(connectedNode);
    adjacencyList[connectedNode].push(startNode);
  }

  return adjacencyList;
};

const edges = [
  ['m', 'n'],
  ['n', 'o'],
  ['o', 'p'],
  ['p', 'q'],
  ['t', 'o'],
  ['r', 'q'],
  ['r', 's'],
];

shortestPath(edges, 'm', 's'); // -> 6
