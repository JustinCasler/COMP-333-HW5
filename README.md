# COMP-333-HW3
## 1. Setup:

Ensure that you have node and npm installed.
To check, run: 
```bash
node -v
```
If you dont have node navigate to [here](https://sebastianzimmeck.de/teaching/comp333/comp333.html), download on 'React Tutorial,' and open "react_install_instructions.pdf".
Follow the instructions to install node.

Now clone this repository.
## 2. Development

### Frontend 
Cd to the frontend directory. Run
```bash
npm install
```
to install all necessary dependencies. 
From the frontend directory use
```bash
npm start
```
to start a local host of the react project.
### Backend
- Download xxamp
- Start the MySql Database and Apache web server from manager-osx which comes with xxamp.
- Go into the htdocs folder within xxamp directory and drag this projects 'backend' folder into htdocs.
- Once your servers have started navigate to http://localhost/phpmyadmin and set up your database to these specifications:
  - Your database, which you should call music_db, should contain the following two tables:
<img width="587" alt="Screenshot 2023-10-31 at 1 54 25 PM" src="https://github.com/JustinCasler/COMP-333-HW3/assets/97986810/448836bb-e3cd-4bfd-a492-5e54ece73838">

  - The id attribute in the ratings table is just an integer that is consecutively increased by one as a tuple (row) is being added. Incrementing should be done via MySQLs autoincrement (AI) feature accessible via phpMyAdmin.
  - You can use the varchar(255) type for username, password, song, and artist. You can use int(11) and int(1) and type for id and rating.
  - You can paste this command into the sql tab in the phpMyAdmin to create these tables.
```sql
CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `artist` varchar(255) NOT NULL,
  `song` varchar(255) NOT NULL,
  `rating` int(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

## Structure:
### MVC
- Model: index.php in the backend. This file receives data from the controller, adds it to the database, and can send responses back to the view  
- View: Each functional component contains react jsx code that makes up the UI and can pass data to the controller. 
- Controller: Each component contains JS that makes calls to the model to do something with new data given by the user and can update the UI.

### Important Files:
Frontend
- App.js: Entry point, contains routes for each component.
- Components/Auth.js: maintains user state, which is used in other components.
- Components/CreateUser.js: Registration page and makes api calls to the backend to add users to the database.
- Components/Delete.js: Deletion page for songs and makes api calls to the backend to delete songs from ratings table.
- Components/Login.js: Login page and makes api calls to to the backend to verify user's existence.
- Components/NewRating.js: Form for users to add song ratings and makes api calls to the backend to add new songs to ratings table.
- Components/SongOverview.js: Home page that shows all the songs that have been rated and allows access to update and delete. Makes api calls to get all songs.
- Components/Update.js: Form to update an existing song and makes api calls to update the song in the database as well
- 
Backend
- index.js: contains a switch statement that runs different functions based on the action requested. Each function will perform one of the CRUD actions and returns a response to the component that made the call.

## Problem #2
- We choose to 'Add Sort or Search Functionality, e.g., search for all songs from a particular artist or with an average rating above a certain threshold.' In the song overview page, you can choose to sort by a variety of options via the dropdown menu.

