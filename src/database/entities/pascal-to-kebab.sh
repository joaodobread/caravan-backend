#!/bin/bash

# get all PascalCase filenames in the current directory
for file in $(ls *[A-Z]*); do
  # convert PascalCase to kebab-case
  kebab=$(echo $file | sed -r 's/([a-z])([A-Z])/\1-\2/g' | tr '[:upper:]' '[:lower:]')
  
  # rename the file
  mv $file $kebab
done