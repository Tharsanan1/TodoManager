#!/bin/bash
sh build-prod.sh
current_version=$(cat version.txt)

new_version=$(echo "$current_version" | awk -F. -v OFS=. 'NF==1{print ++$NF}; NF>1{if(length($NF+1)>length($NF))$(NF-1)++; $NF=sprintf("%0*d", length($NF), ($NF+1)%(10^length($NF))); print}')

echo "$new_version" > version.txt

echo "New version: $new_version"
docker build -t tharsanan/todo-manager:$new_version .
docker push tharsanan/todo-manager:$new_version