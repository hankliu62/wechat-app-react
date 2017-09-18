#!/bin/bash


function help() {
  echo "Usage: $0 pushprod|help"
}

function check() {
  if [ $1 != 0 ];then
    echo "exec fail"
    exit 1
  fi
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

    echo -n ""
    echo -e "\033[37;31;5mDo you want to input custom commit message [yn]?: \c\033[39;49;0m"
    read flag
    flag=$(echo $flag | tr [A-Z] [a-z])
    if [ $flag == "y" ]; then
      echo -e "\033[37;31;5mInput custom commit message: \c\033[39;49;0m"
      echo -n ""
      read commit_msg
    fi
    git commit -m "$commit_msg"
    check $?

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

