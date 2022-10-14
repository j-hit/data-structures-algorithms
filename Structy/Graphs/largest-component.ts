// https://structy.net/problems/largest-component

type GraphAdjacencyList = Record<number, number[]>;

export const largestComponent = (graph: GraphAdjacencyList): number => {
  const visitedNodes = new Set<number>();
  let largestComponentSize = 0;

  for (let node in graph) {
    const currentComponentSize = findComponentSize(
      graph,
      Number(node),
      visitedNodes
    );
    if (currentComponentSize > largestComponentSize) {
      largestComponentSize = currentComponentSize;
    }
  }

  return largestComponentSize;
};

const findComponentSize = (
  graph: GraphAdjacencyList,
  currentNode: number,
  visitedNodes: Set<number>
): number => {
  if (visitedNodes.has(currentNode)) {
    return 0;
  }

  visitedNodes.add(currentNode);

  let componentSize = 1;
  for (let neighbour of graph[currentNode]) {
    componentSize += findComponentSize(graph, neighbour, visitedNodes);
  }

  return componentSize;
};
