# Backend Architecture

The backend for our Coffee-in-the-Cloud application is written in Python using the django web service framework.

In the current application release the following modules are used:

## database layout

## authentication

The ```authentication``` module is responsible for user management and extends the built in system django uses. While
django provides a simple authentication and security system we decided to extend it in order to allow more
customization.

### Models

**Account** This model extends the basic user model and extends to add neccessary fields like email address, name,
profile picture or user balance. Also different user settings are stored there. In order to replace the built in user
model with our own we added an ```AccountManager``` class which handles account
creation.

**Settings** This model allows application wide settings. Currently it is used to store the global available balance.

### Permissions

**IsAccountOwner** This permission checks if the currently logged in user is the owner of the given account. This is
needed in order to prevent users from editing another user's account.

**IsBalanceAdministrator** This permission checks if the currently logged in user is allowed to manage a user's
balance and view/change the global balance.

### Views

**AccountViewSet** This view allows querying all accounts with all details.

**LoginView** This view handles and validates user logins.

**LogoutView** This view handles user logouts.

**StatusView** This view allows querying the current login status. If the user is logged in he will receive all
account information as well as available permissions.

**SettingsView** This view allows the user to view and change their settings. This includes changing the profile
picture.

## schedule

The ```schedule``` module is responsible for the cleaning schedule. It provides models for schedule entries and does
the automatic cleaning assignment.

### Models

**ScheduleEntry** This model represents one entry in the cleaning schedule and contains user, type and date
information. It overrides the saving behavior to automatically send an email.

### Views

**ScheduleEntryViewSet** This view allows querying all schedule entries.

**ScheduleDoneView** This view allows marking the currently assigned cleaning as done.

### Commands

**assignusers** This command assigns users for cleaing. It can be called by using ```manage.py assignusers
<numberOfWeeks>```. The algorithm used is described more in detail in the ```Module Description``` chapter.

## statistics

The ```statistics``` module is responsible for aggregating information about the coffee consumption. It defines no own
models or permissions.

### Views

**StatisticsView** This view groups all coffees by months and returns them to the application.

**StatisticsOwnView** This view groups the current user's coffees by months and returns them to the application.

**StatisticsCoffeeTypeView** This view groups all coffees by the amount (single or double) and returns them to the
application.

## tallylist

The ```tallylist``` module is responsible for tracking coffees. It provides the basic tracking functionality as well
as additional features.

### Models

**TallyListEntry** This model represents one entry on the tally list. It contains functionality to automatically
notify the user when the coffee was tracked. Apart from that the user's balance gets updated aswell.

### Permissions

**IsTallyUser** This permission checks if a tally list entry belongs to the current user.

**IsRecentTally** This permission check if a tally list entry is recent and thus can be removed.

### Views

**TallyListEntryViewSet** This view allows fetching all tally list entries for the current user.

**TallyListAllEntryViewSet** This view allows fetching all tally list entries.

**AccountTallyListEntryViewSet** This view allows fetching or adding tally list entries for/to a specific user.

**BlameView** This view allows blaming the last user that tracked a coffee.

**GlobalBalanceView** This view allows viewing and updating the global and user specific balance. Accessing this view
 requires the ```IsBalanceAdministrator``` permission.

 ## server

 The ```server``` module acts as a configuration module for django.

 **mail** This module contains functionality for sending notification emails.

 **settings** This module contains basic django configuration, see the official documentation for details.

 **urls** This module contains the endpoint configuration. New views have to be registered here in order to make them
 accessable. Also the deployment of static files and the front end is configured here.

 **wsgi** This module contains startup information for deploying the server using wsgi.