# Batteries included fullstack boilerplate

This is a boilerplate for your next big SaaS application. Just plug and play

## Backend

The backend utilizes the django ninja framework, to get the power of django ORM and admin panel, with the speed and simplicity of ninja

This basic boilerplate has build it: 
* regular authentication & registration
* google authentication & registration
* google account linking and unlinking
* starter for your custom business logic

The whole authentication is built with JWT tokens

### Routes

The boilerplate version of this code is divided into 3 routes

* auth
    * this handles all of the user related stuff
* token
    * token verification & retrieval
* api
    * custom business logic for your application

routing will take place within the ninja api and gets implemented inside `api/urls.py` file

## Frontend
todo

## Infrastructure
todo

## Deployment
todo