#!/bin/sh

DAY=$(printf %02d $1)
PART=$2

tsc day$DAY/part$PART.ts

node day$DAY/part$PART.js

rm day$DAY/part$PART.js