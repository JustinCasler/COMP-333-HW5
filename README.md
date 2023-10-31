# COMP-333-HW3
## 1. Prerequists:

Ensure that you have node and npm installed.
To check run: 
```bash
node -v
```
If you dont have node naviaget to [here](https://sebastianzimmeck.de/teaching/comp333/comp333.html), download on 'React Tutorial', and open "react_install_instructions.pdf".
Follow instructions to install node.

Now clone this repository
## 2. Development

### Frontend 
Cd to the frontend directory. Run
```bash
npm install
```
to install all necessary dependancies. 
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




