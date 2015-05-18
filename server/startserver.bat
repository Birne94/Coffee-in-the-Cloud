@echo off

echo.
echo **making migrations**
echo.
manage.py makemigrations

echo.
echo **migrating database**
echo.
manage.py migrate

echo.
echo **starting server**
echo.
manage.py runserver localhost:8000
