/**
 * Route Between Nodes: Given a directed graph, design an algorithm to find out whether there is a route between two nodes.
 */

class GraphNode {
  value: number;
  children: GraphNode[];
  visited: boolean;

  constructor(value: number) {
    this.value = value;
    this.children = [];
    this.visited = false;
  }
}

/**
 * Breadth First Search Solution
 * n = number of nodes
 * e = number of edges (connections)
 * Time O(e) | Space O(n)
 *
 * Alternatively
 * n = number of nodes
 * n^2 = number of edges worst case
 * Time O(n^2) | Space O(n)
 */
export function routeBetweenNodeExists(
  startingNode: GraphNode,
  targetNode: GraphNode
): boolean {
  const queue = [startingNode];

  while (queue.length > 0) {
    const current = queue.shift();
    if (current) {
      if (current.value === targetNode.value) {
        return true;
      }
      current.visited = true;

      for (let neighbour of current.children) {
        if (!neighbour.visited) {
          queue.push(neighbour);
        }
      }
    }
  }
  return false;
}

// Test case
const node0 = new GraphNode(0);
const node1 = new GraphNode(1);
const node2 = new GraphNode(2);
const node3 = new GraphNode(3);
const node4 = new GraphNode(4);
const node5 = new GraphNode(5);

node0.children = [node1, node4, node5];
node1.children = [node3, node4];
node2.children = [node1];
node3.children = [node4];

const result = routeBetweenNodeExists(node2, node4);
console.log(result);
