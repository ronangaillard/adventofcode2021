#!/bin/sh

DAY=$(printf %02d $1)
PART=$2

tsc

node day$DAY/part$PART.js

rm day*/part*.js