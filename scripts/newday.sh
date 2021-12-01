#!/bin/sh

DAY=$(printf %02d $1)

mkdir day$DAY

cp .templates/part.ts day$DAY/part1.ts
cp .templates/part.ts day$DAY/part2.ts