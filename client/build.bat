@echo off

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

