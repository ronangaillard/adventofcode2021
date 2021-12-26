#!/bin/sh

DAY=$(printf %02d $1)
PART=$2

tsc

node --max-old-space-size=8192 day$DAY/part$PART.js

rm **/*.js