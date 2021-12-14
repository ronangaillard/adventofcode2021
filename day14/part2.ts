import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const [rawPolymer, rawRules] = input.split('\n\n');

const rules = new Map<string, string>();

rawRules.split('\n').forEach(rule => {
  const [pair, element] = rule.split(' -> ');
  rules.set(pair, element);
});

let polymer = rawPolymer.split('');

let pairs = new Map<string, number>();

for (let cursor = 0; cursor < polymer.length - 1; cursor += 1) {
  const pair = [polymer[cursor], polymer[cursor + 1]].join('');

  pairs.set(pair, (pairs.get(pair) ?? 0) + 1);
}

for (let step = 0; step < 40; step += 1) {
  let newPairs = new Map<string, number>();

  for (let [pair, count] of pairs) {
    if ((pairs.get(pair) ?? 0) > 0) {
      const newElement = rules.get(pair);

      const pair1 = [pair[0], newElement].join('');
      const pair2 = [newElement, pair[1]].join('');
      newPairs.set(pair1, (newPairs.get(pair1) ?? 0) + count);
      newPairs.set(pair2, (newPairs.get(pair2) ?? 0) + count);
    }
  }

  pairs = new Map(newPairs);
}

let charCount: Record<string, number> = {};

[...pairs.entries()].forEach(([pair, count]: [string, number]) => {
  charCount[pair[0]] = charCount[pair[0]] ? charCount[pair[0]] + count : count;
});

charCount[polymer[0]] += 1;
charCount[polymer[polymer.length - 1]] += 1;

console.log(Object.entries(charCount).sort((a, b) => b[1] - a[1]));
