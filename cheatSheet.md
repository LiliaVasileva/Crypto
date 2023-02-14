#Cheet Sheet

1. Initialize project  
1.1- npm init --yes
1.2 adding start script to package.json file
1.3 install nodemon only for dev dependency  - npm install nodemon -D
2. npm install express and set up
2.1 set up express;
2.2. add routes
2.3 add static files and routes
3. Add view engine - express -handlebars 
*register with express;
*add view folder, layouts folder and main.hbs
* add partial template folder
4. Add home controllers
* add controller to routes
5. Configure database.
6. Authentication
* fix html links in layout
* add auth controller
* add register page
* add login page
7. Add user model;
8. Add auth service;
9. Install bcrypt and cookie-parser and configure
10. Register user
* validate repeat password
* check if user exists
* use  bcrypt to hassh password
11. Login user
* check if user exists;
* check if password is valid
12. Generate  jwt token
* OPTINAL: use  util.promisify to use async
* generate token with payload and Secret
* add token to cookie
13.  Add authentication middleware
 * add decoded token to request
 * use authentication middleware
14. Logout
15. Authorization middleware;
16. Dynamic navigation;
17. Error handling (use local handling);
18. Add error notification to main layout;
19. Login authomatically after register;
20. Parse errors;


