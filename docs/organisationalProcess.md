# Organisational Process

## General

Likewise many other software projects, we used for coffe-in-the-cloud the scrum technique. That means we organised the project with Jira, which is an issue tracking software developed by Altassian. Our main communication tool for the team itself was Slack and Facebook messanger. We used Slack as it provides the possibility to integrate git notifications and many more. We had weekly standup meetings and biweekly sprints. 

## Functional Requirements - Userstories
All the user stories where assessed and discussed beforehand. The effort and the core features were determined. In the following the userstories are explained in detail according to their sprints. 

### Sprint 1

**Add Account**

The admin can add an account to the system including first name, last name, email and a picture. The password will be created automatically and will be sent to the usa via an email. Additionally he can activate his account thourgh this email. 

**Edit Account**

When the user is logged in, he is able to do some changes. This includes the email adresse, the password and the profile picture. 

**Remove Account**

The admin is able to remove an account if requested. 

**Login**

The user can authenticate through username and password.

**Picture Login**

The user is displayed a set of picture on a sreen. Via clicking or touching on a picture, the user can authenticate. Next to the picture will be the name of the user.

**Coffee Tracking**

When logged in, the user can add one or more coffees. He can undo this.

**Cleaning Schedule**

The user can see the cleaning schedule for the upcomming weak. 

### Sprint 2

**Email Reminder - Cleaning**

When a user is assigned for cleaning he will get an email reminder. This reminder can be turned off in his personal settings.

**Email Reminder - Account Balance**

When the user's balance goes below a certain amount he is notified via email. This reminder can be turned off in his personal settings.

**Email Confirmation - Coffee Tracking**

When tracking coffee(s) the user gets a notification via email if he choses to. Using this email he can also undo the tracking within a certain time frame.

**Statistics**

From all data gathered over the statistics will be generated. The user can opt out of having his data displayed to others.

**Checklist: Cleaning**

A checklist provided on the tablet and mobile application helps the user to keep track of each step involved in the cleaning process.

**Tutorials: Photo**

To support the processes of cleaning and coffee making a photo tutorial is provided.

### Sprint 3

**Cleaning Schedule: Intelligent Assignment**

The responsible user for cleaning is chosen by the system. It will take into account if somebody has marked himself as absent for a certain amount of time.

**Guest Account**

For tracking coffees a guest account exists. It allows guests of the chair to also track their coffees without having an own account.
* The account should be accessible by the admin (login with admin credentials)
* It should behave like a normal user account, e.g. it includes statistics
* This account can be enabled or disabled by system administrators
* A summary email should be send to the admin every X days (configurable)

**User Rankings**

Rankings show some kind of leaderboard according to the amount of coffee consumed by each user in a certain time frame. Users can opt out of having their data displayed.

**Display total amount of money available**

As an administrator I want to see how much money is available for buying coffee. This should be shown in the admin backend. When new coffee is bought the admin needs to reduce the total amount.

**Add cleaning checklist to tablet mode**

The user wants to see the cleaning checklist although he is not logged in.

**Distinguish between weekly and bi-weekly cleaning in calender**

As a user I want to see which kind of cleaning I should perform. Use different colors.

**Show a message on the main page if selected for cleaning**

As a user I want to see whether I have to clean. This should be visible on the tablet as well as on the user page.

**Settings page for users**

As a user I want to be able to configure my account on a settings page.
* email configuration
* profile pic
* password

**Extend cleaning checklist**

Add restart Button and Finish Button to the coffee checklist. Cross out finished tasks

**Include calender entry invitation in cleaning email**

As a user I want that a calendar invitation is included in the email that informs me about my cleaning schedule.

**Blame feature**

I want to have a feature in tablet mode to blame someone who did not clean the porta filter. An "reminder" email is sent to the last coffee drinker (add something like "it might be possible that someone else did not clean but did not register the coffee").


## XP-Techniques

In order to work efficiently and fullfill our users requirements as good as possible, we used some of the practices of extreme programming. In our opinion this was really successfull. 

### small releases

We intregrated code early and often. As a result we had less bugs and always a running version of our software. Additonally we got the feedback quicker and it also incresed our self confidence. 

### pair programming

In the course of the weeks we realized, that we did much better work when developing together. Therefore we often implementen user stories in pairs where one was the driver (types code) and the partner tried to be completly engaged and understand  everything. 

### collective code ownership

As we often worked together on user stories, everybody was allowed to change the code of the others. This was reasonable because it avoids expert knowlegde. 


