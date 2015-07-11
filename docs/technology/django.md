# Finding a backend framework

As our application needed a web service to run permanently we first had to decide on a framework. We narrowed down
our options to three different technologies some of us had already worked with.

## Flask

Flask is a lightweight framework for creating web services written in Python. It offers basic routing and has has
close to no overhead. While it is very easy to use it only provides very basic functionality and thus we would have
to implement many core features like session management or database-models ourselves.

## node.js

Node.js is a powerful framework for creating web services written in Javascript. The downside to node.js was that none
of us had already built a more complex platform using it, so we would have to slowly learn all neccessary features.

## Django

Django is a web framework also written in Python. It has a more complex structure but includes a lot of additional
functionality. The core features we rely on are session management, object-relationship-management for our database
and url-routing for creating our database.

We had some experience in working with django from previous projects and it integrated perfectly with our requirements.

In addition to django we are using the ```rest_framework``` library to easen the creation of a restful API.

# Short introduction

A django project consists of several modules, which are thematically separated. Each module contains models, views
and other classes needed.

Django follows the MVC architecture, separating data, logic and display.

## Models

A model is a class that describes the data structure of objects. Instances of these models are automatically stored
into and loaded from our database. Also changes are automatically tracked and can be reverted at any time.

Models are defined in each module within a ```models.py``` file. This file then contains one class for each model.
These in general are a subclass of the type ```django.db.models.Model``` and define all fields as python data types.

Apart from fields model can also specify special behavior, for example for automatic validation when editing field
values.

## Permissions

A permission allows access restriction based on users and groups. The built in permissions can be extended to allow
custom control. These can then be assigned to specific users or user groups.

## Views

A view is responsible for converting model data into usable data. In our case each model either loads models from the
database and converts then into a json response or processes a request and changes a model's state.

As we are using the ```rest_framework``` extension we do not have to handle json conversion and object validation
ourselves. Each view can so define different methods for viewing or manipulating data.

For example a ```list``` method allows automatic rendering of a object list. ```post``` and ```get``` respectively
handle POST and GET requests via HTTP.

In order to grant an application access to a newly created view it has to be registered in the routing system. This
can be found in ```/server/server/urls.py``` and lists all API endpoints available.

## Serializers

A serializer is responsible for converting a model into a json representation. In most cases it defines a collection
of fields that are publicy accessable. For special cases like account creation it is possible to add custom
validation behavior, which in this example validates the password and then updates session information.

## Migrations

Migrations are a powerful tool to alter models without manually changes the database structure. They can be created
automatically by django after a model has been changed. It also allows for multiple developers to change the models
and then merge all changes.

A new migration can be created through the console via ```manage.py makemigrations```. Afterwards all pending
migrations can be applied by using ```manage.py migrate```. This step is not neccessary when creating a new database
as django automatically applies the needed changes.

## Management/Commands

Each module can define special commands to be used from the management console (```manage.py```). These in general
are used for administration purposes and can only be accessed from the server side. In our application this is used
for handling automatic schedule assignment.

## Templates

A template contains a preformatted text that can be dynamically filled with information. Usually these are used for
creating dynamic HTML responses, in our application we only use then for the email functionality.

## Static file deployment

In our application we use django to deploy all static files including our angularjs app. Because of this there is no
need for a secondary web server like apache.

## Administration interface

Django provides an administration interface which allows all users tagged as ```staff``` to manipulate models
directly. This can be used to correct errors or create manual objects. Every action taken in the administration
interface will be logged in case some unwanted changes are made.

A common usage would be to change a user's password, in case they forgot it.