import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

const linesAsNumber = lines.map(line => parseInt(line, 10));
