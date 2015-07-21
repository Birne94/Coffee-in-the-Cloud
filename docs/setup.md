# Application Setup and Deployment

In order to deploy our application you will need the following components installed on your system:

* Python 2.7 including PIP
* Apache including ```mod_wsgi```
* Node Package Manager (npm)
* git

## Clone the repository

At first you have to clone the repository from github.

```
git clone https://github.com/Birne94/Coffee-in-the-Cloud.git
```

## Install client dependencies

Install bower and grunt.

```
npm -g install bower
npm -g install grunt
npm -g install grunt-cli
```

Install dependencies and compile less (run inside client directory).

```
npm install
bower install
grunt less
```

## Install server dependencies

Install dependencies and create the database (run inside server directory).

```
python install-dependencies.py
python manage.py migrate
```

Copy the file ```setup/settings2.py``` to ```server/server/``` and adjust ```MEDIA_ROOT``` (absolute path).

Copy the file ```setup/django.wsgi``` to ```server/apache/``` and adjust absolute path names.

## Configure apache

Add the contents of the file ```setup/apache.conf``` to your apache configuration or include it.

Adjust the port, virtual host and absolute path names for the application and your local python installation.

## Adjust permissions

Make the ```server``` directory, ```server/db.sqlite3``` and ```server/static/upload/``` writable to everyone (```chmod 777```).

## Restart apache

After restarting apache the application should be accessible.
