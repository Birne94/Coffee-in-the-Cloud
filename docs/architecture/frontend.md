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

The Login-Popup appears when the "sing in" button is clicked on. The user can now enter his login credentials composed of an email address and a password. By clicking "Login" the *login()* function is called in the loginController. Otherwise the user can abort the login process by simply pressing the "cancel" button. Once logged in, a short alert message welcomes the user and the user has now full access to the web-application. 

### Tally List

In order to see the current coffee consumption the user visits the **Tally List** tab. Responsible here is the ```tallylistController.js``` and the corresponding ```tallylist.html``` view. 

**tallylistController.js**

The **tallylistController** has two rather obvious methods. On the one hand, when a coffee is added to the tallylist the *addCoffee(amount)* function is called. The amount depends on whether the user decides to drink a single or a double coffee. In the following the two global methods *updateTally()* and *updateUser()* from the LoginController are called. 

On the other hand, the user has the possibility to revise the adding within two hours. Therefore the *removeCoffee(id)* is called with the matching coffee ID which causes the entry to be removed from the users tallylist.

**tallylist.html**

Like on the *Main Page* the user is shown a banner with his current balance and the amount of coffees on the list. Additonally if the balance is low, a warning appears. 

The user has now the possibilty to add a single or a double coffee to his tallylist by pressing the corresponding button. This will trigger the *addCoffee(amount)* function in the **tallylistContoller**. Of course, after adding the coffee, the banners are updated with the new amount of coffees and balance. 

As mentioned beforehand the user is able to revise the adding of the coffee by clicking on the dustbin symbol. This is only possible within the next two hours of adding. 

### Cleaning Schedule

As the cleaning of the coffee machine has to be scheduled, we build a calendar composed of the ```scheduleController.js``` and the ```schedule.html```. 

**scheduleController.js** & **schedule.html**

Basically the controller sends a request to the backend in order to receive the necessary data for the calendar. How the algorithm works, will be explained later on. The data important for us is the person  and the type of cleaning assigned. To distinguish the diffrent kinds of cleaning we assigned them different colors. Additionally if the cleaning is finished, it will be shown as crossed out und in gray. Of course one can select between daily, weekly and monthly view in the calendar. 

### Statistics


### Tutorials

The turorials page is one of the pages, which can be seen, even if the user is not logged in. It's just a simple photo tutorial, where the user gets a step by step instruction on how to use the coffee machine correctly. 

**tutorialsController.js** & **tutorials.html**

The whole process is rather simple. At the begining the user sees two pictures and can deceide whether to drink a single or a double coffee. After some more instructions, the user has to choose between adding milk, water or nothing to his coffee. Depending on the decision the matching photos are shown. 

In the *tutorialsController.js* the important method is *next(cb)*. It is called by clicking on the picture directly or the arrows next to the pictures. This function then determines as the name says, the following pictures. 

### Cleaning Checklist

### Picture Login - Tablet Mode

### Settings
