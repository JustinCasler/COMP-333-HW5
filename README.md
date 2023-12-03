# COMP-333-HW5
**This repo contains the code for testing https://github.com/JustinCasler/COMP-333-HW3.**

## 0. Setup:
- Clone this repo
- Follow the initial setup as outlined  [here](https://github.com/JustinCasler/COMP-333-HW3/blob/main/README.md)
  - Installing node,
  - Installing the correct dependencies
  - Installing xxamp
  - The same database setup
  - Copying the backend folder from this repo into the htdocs folder.
  - Starting the MySQL and Apache servers from manager-osx
## 1. Problem 1
From the main directory copy
```sh
python python_unit_test.py
```
in your terminal. The output should print in the terminal.
## 2. Problem 2
- Make syre you have pytest installed, if you don't: See [here](https://github.com/JustinCasler/COMP-333-HW3/blob/main/testing-setup.md) for instructions. 
From the main directory copy 
```sh 
pytest pytest_unit_testing.py
```
in your terminal. The output should print in the terminal.
## 3. PHP Unit Tests
- Make sure that the backend folder of this repo is copied into the htdocs filder in xxamp application
- Make sure that the MySQL and Apache servers from manager-osx are running
- Make sure you have PHP unit installed. See [here](https://github.com/JustinCasler/COMP-333-HW3/blob/main/testing-setup.md) for instructions.  
- In MusicAppTest.php change the 80 in `private $baseUri = "http://localhost:80/backend/index.php"` to be whatever the port is of your Apache Web Server.
- Now initalize your database like so:
  - To start the app, cd (or navigate in the terminal) to the frontend and paste `npm start` into the terminal
  - Register a new user with the username: `existing_user_test_user` and password: `existing_user_test_password`
  - Now login, and create a song ratings of your choice so the ratings table is not empty. 
- In the `testPost_DeleteSong()` function within MusicAppTest.php, we need to update $existingSongId variable to be the song ID of an existing song. Before `testPost_DeleteSong()` runs we run `testPost_NewSong` which creates a song for us to delete. Before running the test take note of what the id the next song created will have. So if only 1 song has ever been created which happened in the step above, then set $existingSongId = 2, after you run the tests once now $existingSongId = 3, etc. 

- Now that the database is prepared correctly, navigate from the main directory to: backend->test-project, and run 
```sh
php vendor/bin/phpunit tests/MusicAppTest.php
```
- The output should print in the terminal
 
