# Frontend Architecture

The frontend for our Coffee-in-the-Cloud application is written in Javascript using among others the angularJS and requiereJS framework and bootstrap.   

In the following, we will explain our services and afterwards the controllers together with their views

## Services

### alter.js

### coffeeCloud.js

### services.js

### status.js

## Controllers and Views

### Main Page - Home

The  **Main Page** is the first page seen when visiting the coffee-in-the-cloud page. It consists of the  ```welcomeController.js```and the view  ```welcome.html```.

**welcomeController.js**

The main task of the controller is to give an alert-message saying "Thank you for doing the cleaning!". This happens after someone did the cleaning and pressed the *Finished Cleaning* button. In case, something an erorr occured during the function call, another allert will tell you so. 

**welcome.html**

First of all the welcome view has to states depending on whether you are logged in or not. 

***Logged out***

When first visiting the page without being logged in, you get greeted and you have the possibility to log in via a "sing in" button. Futhermore one is able to click on the Tutorials and Cleaning-Checklist navbar tab or click on the icons for tablet mode and admin interface in the footer. 

***Logged In***

When logged in, different kind of banners can me seen. The one in blue, which is shown always, states how many coffees you have on the list and your current balance. If this balance is below 2.00 Euro, another red banner appears and kindly asks you to add more money to your account. By clicking on the x, this banner disappears.  

In case you are selected for cleaning, a third banner in yellow can be seen beneath. There you can either close the banner by clicking on the x or tell the system, that you sucessfully finished the cleaning by clicking the check. This can alternatively be done when pressing the "finished cleaning"-Button.

Moreover, you will get complimented if you are the number 1 coffee drinker. This is again shown by a blue banner stating "You have drunk most of the coffee so far. Good job!". It can be closed aswell. The data used for estimating the winner, are loaded beforehand in the loginController. (see below). 

Of course, when logged in, one has access to all the other navbar tabs like Statistics or Tally List too. 

### Login 

For Logging in via the Login Button, on the one hand the ```loginController.js``` and on the other hand the ```login-popup.html``` view is needed. 

**loginController.js**

The loginController has a lot of functionality as it loads all the necessary data beforehand. For reason of having value code and not any unnecessary code repetitions we outsourced function, which are called more often by diffrent views, in the loginController. 

As mentioned in the paragraph before, the ranking is calculatet here. So everytime someone logs in, the controller compares the tally list entries of all the users and estimate the winner(s). 

One of the global function in the loginController is *updateUser()*. This function is called in several occasions. For example, when the user logs in. It is responsible for updating the currently logged in user's data and loads the user object and his tally list from the server. Additionally it is checked whether or not the user is selected for cleaning.

The second relatively huge global method is *updateTally()*, called when you add a coffee to your tallylist. 

When the user wants to logout and presses the "sign out" button, the controller accomplish the logout process by calling the *logout()* function.


**login-popup.html**

The Login-Popup appears when the "sing in" button is clicked on. The user can now enter his login credentials composed of an email address and a password. By clicking "Login" the *login()* function is called in the loginController. Otherwise the user can abort the login process by simply pressing the "cancel" button. Once logged in, a short alert welcomes the user and the user has now full access to the web-application. 

### Tally List

### Cleaning Schedule

### Statistics

### Tutorials

### Cleaning Checklist

### Picture Login - Tablet Mode

### Setting


