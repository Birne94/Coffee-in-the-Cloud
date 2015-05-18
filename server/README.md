# REST API


## /api/

Query API version

* ```status``` true if the request was successful
* ```version``` version string (e.g. ```1.0```)


## /api/user

Get user status

* ```status``` true if the request was successful
* ```user_id``` user id
* ```user``` user object
    * ```FirstName```
	* ```LastName```
	* ```Email```
	* ```Balance```

	
## /api/user/login

Login user

POST parameters: ```user_id```

* ```status``` true if the request was successful


## /api/user/logout

Logout user

* ```status``` true if the request was successful


## /api/tally

Get tally entry for the current user

* ```status``` true if the request was successful
* ```coffee_count``` amount of coffees the user has on the list
* ```coffees``` list of coffees
    * ```Amount```
	* ```Time```


## /api/tally/add

Add coffee(s) to the list for the current user

POST parameters: ```amount```

* ```status``` true if the request was successful

