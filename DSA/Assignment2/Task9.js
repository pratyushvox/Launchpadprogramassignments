//detecting thw cycle in dependencies
const detectCycle = (deps) => {
  const visited = new Set();
  const stack = new Set();

  const hasCycle = (nodeId, path) => {
    if (stack.has(nodeId)) {
      path.push(nodeId);
      return true;
    }

    if (visited.has(nodeId)) return false;

    visited.add(nodeId);
    stack.add(nodeId);
    path.push(nodeId);

    const node = Object.values(deps).find(d => d.id === nodeId);
    if (node && node.dependsOn) {
      for (let dep of node.dependsOn) {
        if (hasCycle(dep.id, path)) {
          return true;
        }
      }
    }

    stack.delete(nodeId);
    path.pop();
    return false;
  };

  for (let key in deps) {
    const path = [];
    if (hasCycle(deps[key].id, path)) {
      path.push(path[0]); 
      return { hasCycle: true, cyclePath: path };
    }
  }

  return { hasCycle: false };
};

const deps = {
  A: { id: 1, dependsOn: [{ id: 2 }] },
  B: { id: 2, dependsOn: [{ id: 3 }] },
  C: { id: 3, dependsOn: [{ id: 1 }] }
};

console.log(detectCycle(deps)); 

