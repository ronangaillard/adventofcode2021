import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

const caveGraph: Map<string, string[]> = new Map();

lines.forEach(line => {
  const [cave1, cave2] = line.split('-');

  const cave1Childrens = caveGraph.get(cave1) ?? [];
  cave1Childrens.push(cave2);
  caveGraph.set(cave1, cave1Childrens);

  const cave2Children = caveGraph.get(cave2) ?? [];
  cave2Children.push(cave1);
  caveGraph.set(cave2, cave2Children);
});

const paths = [['start']];

let pathCount = 0;

while (paths.length) {
  const previousNodes = paths.pop()!;

  for (const currentNode of caveGraph.get(previousNodes[previousNodes.length - 1])!) {
    if (currentNode === 'end') {
      pathCount++;
    } else if (currentNode === currentNode.toUpperCase()) {
      paths.push([...previousNodes, currentNode]);
    } else if (!previousNodes.includes(currentNode)) {
      paths.push([...previousNodes, currentNode]);
    }
  }
}
console.log(pathCount);
