#!/bin/bash

echo "npm install"
npm install

echo "bower install"
bower install

echo "build less"
grunt less

