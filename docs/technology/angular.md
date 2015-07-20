# AngularJs

In the Coffee in the Cloud-Application we use angularjs for our frontend and user interface. AnuglarJs is a
javascript framework that allows the creation of MVC (Model-View-Controller) based web applications. Because of this
the code will stay properly divided into three core parts that are described below.

In order to manage dependencies we use the node package manager (short npm) and bower. These allow installing of
dependencies in a bulk. Because of this we do not have to ship them and can keep the code base clear.

The application loads all dependencies asynchronously through require.js whenever they are needed. Because of this we
have short loading times and can make sure that everything is loaded in the right order. Require.js also provides
dependency injection so we do not have to worry about initializing controllers and services ourselves.

As we do not want the application to reload every time the user performs an action we use a routing system. This allows
us to have multiple views within one application that are loaded dynamically.

## Models

Models contain all kind of data we would like to use, for example users, tally list or calendar entries. In our
application these are created and managed server side. The server also handles persisting the data into our database.
Because of this the models are replaced by a service that fetches data from our server.

## Controllers

Controllers are necessary to create useful data from the models we have stored. For every page that will ultimately
be displayed in our application a controller fetches the data and prepares it for the user. This also includes
validation of user generated information.

The controllers will be both implemented server and client side as they will manage the connection between these to
parts of our application.

## Views

Views are responsible for displaying all data to the user. In the views we create a user interface that will be
displayed on the client's browser. AngularJs extends the HTMl syntax and functionality to allow the creation of basic
templates in these views.

Each view is tied to a controller that determines its behavior.

## Directives

AngularJs offers a way to extend basic HTML. These so called directives introduce new tags or attributes.

## Project structure

The client project contains of several type of resources that are separated in different folders.

**/index.html** contains the main application and entry point.

**/js/** contains controllers, directives, services and libraries installed by bower.

**/less/** contains less stylesheets that will be compiled to css on deployment.

**/public/** contains static images and stylesheets.

**/views/** contains views as HTML files.

All other files in the client directory are resource files needed for bower and node to include all needed dependencies.
