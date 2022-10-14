// https://structy.net/problems/connected-components-count

type GraphAdjacencyList = Record<number, number[]>;

export const connectedComponentsCount = (graph: GraphAdjacencyList): number => {
  const visitedNodes = new Set<number>();
  let amountOfConnectedComponents = 0;

  for (let node in graph) {
    if (exploreComponents(graph, Number(node), visitedNodes) === true) {
      amountOfConnectedComponents += 1;
    }
  }

  return amountOfConnectedComponents;
};

const exploreComponents = (
  graph: GraphAdjacencyList,
  currentNode: number,
  visitedNodes: Set<number>
): boolean => {
  if (visitedNodes.has(currentNode)) {
    return false;
  }

  visitedNodes.add(currentNode);

  for (let neighbour of graph[currentNode]) {
    exploreComponents(graph, neighbour, visitedNodes);
  }

  return true;
};
