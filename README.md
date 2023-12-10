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
- Make sure you have pytest installed, if you don't: See [here](https://github.com/JustinCasler/COMP-333-HW3/blob/main/testing-setup.md) for instructions. 
From the main directory copy 
```sh 
pytest pytest_unit_testing.py
```
in your terminal. The output should print in the terminal.
## 3. PHP Unit Tests
- Make sure you have phpunit, guzzle, and composer installed, if you don't: See [here](https://github.com/JustinCasler/COMP-333-HW3/blob/main/testing-setup.md) for instructions. 
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
The output should print in the terminal and look like this:
<img width="657" alt="Screenshot 2023-12-09 at 2 54 54 PM" src="https://github.com/JustinCasler/COMP-333-HW5/assets/97986810/60d19c02-14ea-4e8d-8256-a3672a6607fd">

## 4. Frontend Unit Tests with Jest
- Make sure you have Jest downloaded. It should be included with React
- At the root folder of the repo, run:
    `npm i`
- cd to the frontend folder (where the package.json file is) and run:
    `npm i`
- Run Jest tests:
    `npm run test`
 ![Alt text](<Screenshot 2023-12-09 at 14.36.08.png>)

 ## 5. Set Up Continuous Integration for Frontend Unit Test

 ![Alt text](<Screenshot 2023-12-09 at 20.51.30.png>)

 ## 6. Generative AI
 Large language Model could be useful in creating tests. For example, you could first give Chat GPT some example of a link test for frontend testing:

```javascript
 // views/Layout.test.js
 import { render, screen, fireEvent } from "@testing-library/react";
 import { BrowserRouter } from "react-router-dom";
 import "@testing-library/jest-dom";
 import Layout from "./Layout";

 test("clicking on the Contact link navigates to the Contact page", () => {
   render(
     <BrowserRouter>
       <Layout />
     </BrowserRouter>
   );
   const linkElement = screen.getByText(/Contact/i);
   fireEvent.click(linkElement);
   const contactElement = screen.getByText(/Contact/i);
   expect(contactElement).toBeInTheDocument();
 });
 ```
Then, you could input the javascript code for the frontend page you want to test and ask the model to generate similar test as the provided example. This is an example result of that query:
// login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login'; // Update with your actual component

``` javascript
    test('navigates from login to registration page', () => {
          render(
            <MemoryRouter>
              <Login />
            </MemoryRouter>
          );

          // Click the link to navigate
          fireEvent.click(screen.getByText(/create one here/i));

          // Check if the registration page is rendered
          expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        });
```
The code that is produced by the model usually result in some errors due to contextual problems, such as missing dependencies. However, generative AI is a great tool to provide general guidance or baseline code to work with as presented above.
    


 
