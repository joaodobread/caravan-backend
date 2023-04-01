#!/bin/bash

# Output file to write exports to
output="index.ts"

# Find all .ts files in the current directory
ts_files=($(find . -name "*.ts"))

# Loop through each file and generate export statements
for file in "${ts_files[@]}"; do
  # Get file name without extension
  filename=$(basename -- "$file")
  extension="${filename##*.}"
  filename="${filename%.*}"
  
  # Generate export statement
  echo "export * from './$filename';" >> "$output"
done

echo "Done generating exports in $output"