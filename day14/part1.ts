import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const [rawPolymer, rawRules] = input.split('\n\n');

const rules = new Map<string, string>();

rawRules.split('\n').forEach(rule => {
  const [pair, element] = rule.split(' -> ');
  rules.set(pair, element);
});

let polymer = rawPolymer.split('');

for (let step = 0; step < 10; step += 1) {
  let newPolymer = [] as string[];
  for (let cursor = 0; cursor < polymer.length - 1; cursor += 1) {
    const pair = [polymer[cursor], polymer[cursor + 1]].join('');
    const element = rules.get(pair) as string;

    newPolymer = [...newPolymer, polymer[cursor], element];
  }

  newPolymer = [...newPolymer, polymer[polymer.length - 1]];

  polymer = newPolymer;
}

let charCount: Record<string, number> = {};

polymer.forEach(char => {
  charCount[char] = charCount[char] ? charCount[char] + 1 : 1;
});

console.log(Object.entries(charCount).sort((a, b) => b[1] - a[1]));
