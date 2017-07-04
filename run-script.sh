#!/bin/bash

# Get the action to run
ACTION=$1;
SCRIPTS_FOLDER="./client";
DIST_FOLDER="./public";
CACHE_FOLDER="./cache"

function start-watchify() {
    watchify -v -d -t [ babelify --presets [ es2015 ] --compact false ] $SCRIPTS_FOLDER/$1 -o $DIST_FOLDER/$2
}

function watch-client() {
    NODE_PATH=$NODE_PATH:$SCRIPTS_FOLDER start-watchify index.js client.min.js
}

function start-build() {
    NODE_ENV=production browserify -t [ babelify --presets [ es2015 ] --compact false ] $SCRIPTS_FOLDER/$1 | uglifyjs > $DIST_FOLDER/$2
}

function build-client() {
    NODE_PATH=$NODE_PATH:$SCRIPTS_FOLDER  start-build index.js client.min.js
}

function cache-clear() {
    find $CACHE_FOLDER -ctime +30 -exec rm {} \;
}

function cache-clear-all() {
    find $CACHE_FOLDER -type f -exec rm {} \;
}

echo "Running: ${ACTION}"

case ${ACTION} in
    "watch")
        watch-client
        ;;
    "build")
        build-client
        ;;
    "cache-clear")
        cache-clear
        ;;
    "cache-clear-all")
        cache-clear-all
        ;;
esac

