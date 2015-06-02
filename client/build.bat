@echo off

call npm -g install bower
call npm -g install grunt
call npm -g install grunt-cli

echo.
echo **Installing node.js packages**
echo.

call npm install

echo.
echo **Installing bower components**
echo.

call bower install

echo.
echo **Building less**
echo.

call grunt less

