## Setup

* Check out our repository from github.

* Copy ```django.wsgi``` to ```server/apache/``` and adjust absolute path names.

* Copy ```settings2.py``` to ```server/server/``` and adjust ```MEDIA_ROOT``` (absolute path).

* Make the ```server``` directory, ```server/db.sqlite3```, ```server/static/upload/``` writable to everyone (```chmod 777```).

* Install node package manager (npm) through your operating system's package manager.

* Run the following commands inside the ```client``` directory:
```
npm -g install bower
npm -g install grunt
npm -g install grunt-cli

npm install
bower install
grunt less
```

* Install python 2.7 and ```pip``` (python package index).

* Run the following scripts inside the ```server``` directory:
```
python install-dependencies.py
python manage.py migrate
```

* Add the django server to your apache configuration (see apache.conf), change all absolute paths to match your setup.