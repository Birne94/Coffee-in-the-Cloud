@echo off

echo "making migrations"
manage.py makemigrations

echo "migrating database"
manage.py migrate

echo "starting server"
manage.py runserver localhost:8000
