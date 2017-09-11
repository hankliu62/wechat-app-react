#!/bin/bash


function help() {
  echo "Usage: $0 pushprod|help"
}

function pushprod() {
  git_folder=".git"

  if [ -d "$git_folder" ]; then
    stash_msg=$(git stash)
    git pull -r
    if [[ "$stash_msg" != "No local changes to save" ]]; then
      git stash pop
    fi
    # 获得git log中第一条以feat或者fix开头的记录，将头部替换成build
    commit_msg=$(git log | sed 's/^[ \t]*//g' | egrep "^feat|^fix" | sed -n '1,1p' | sed 's/^feat/build/g' | sed 's/^fix/build/g')
    commit_msg="${commit_msg} on prod env"
    npm run prod
    git add dist/client/
    git commit -m "$commit_msg"

    stash_msg=$(git stash)
    git push
    if [[ "$stash_msg" != "No local changes to save" ]]; then
      git stash pop
    fi
  fi
}

case "$1" in
  "pushprod" ) pushprod;;
  * ) help;;
esac

