#!/bin/bash
FILES=`ls rollup.config.*.js`
for f in $FILES
do
  echo "Processing $f file..."
  # take action on each file. $f store current file name
  rollup -c $f
done
