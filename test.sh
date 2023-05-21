#!/bin/bash

# Read the current version from the file
current_version=$(cat version.txt)

# Increment the version
new_version=$(echo "$current_version" | awk -F. -v OFS=. 'NF==1{print ++$NF}; NF>1{if(length($NF+1)>length($NF))$(NF-1)++; $NF=sprintf("%0*d", length($NF), ($NF+1)%(10^length($NF))); print}')

# Update the version file with the new version
echo "$new_version" > version.txt

# Output the new version
echo "New version: $new_version"
