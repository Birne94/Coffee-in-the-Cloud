# AngularJs

In the Coffee in the Cloud-Application we use angularjs for our frontend and user interface. AnuglarJs is a
javascript framework that allows the creation of MVC (Model-View-Controller) based software. Because of this the code
will stay properly divided into
these three core parts.

## Models

Models contain all kind of data we would like to use, for example users, tally list or calendar entries. In our
application these are created and managed server side. The server also handles persisting the data into our database.

## Controllers

Controllers are neccessary to create useful data from the models we have stored. For every page that will ultimately
be displayed in our application a controller fetches the data and prepares it for the user. This also includes
validation of user generated information.

The controllers will be both implemented server and client side as they will manage the connection between these to
parts of our application.

## Views

Views are responsible for displaying all data to the user. In the views we create a user interface that will be
displayed on the client's browser.