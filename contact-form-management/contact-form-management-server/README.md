# Contact Form Management System's Backend

In backend part of Contact Form Management System project I had a chance to work on Node.js, Express.js, Websocket.

## Backend Server Endpoints

### POST /api/user/login

Allow users to log in by sending a username and password. On successful login, return a JWT token that should be used for subsequent requests.
 
### POST /api/user/check-login

Validate if the user is logged in by sending the JWT token in the request headers.

### POST /api/user/logout

Log out the currently logged-in user by blacklisting the JWT token.

### GET /api/countries

Fetch a list of countries to populate a dropdown in the frontend contact form.

### POST /api/message/add

Allow users to submit a contact form with the following fields: name, message, gender, and country.

### GET /api/messages

Retrieve all contact form messages. Only authenticated users with the role of "admin" or "reader" can access this endpoint.

### GET /api/messages-with-pagination

Paginate messages and provide sorting options based on client parameters. Requires authentication for "admin" and "reader" roles.

### GET /api/messages-with-scroll

Paginate messages using scrolling with authentication required for "admin" and "reader" roles.

### GET /api/message/:id

Retrieve a specific contact form message by its ID. Only authenticated users with the role of "admin" or "reader" can access this endpoint.

### POST /api/message/read/:id

Mark a contact form message as read by its ID. Only authenticated users with the role of "admin" or "reader" can access this endpoint.

### POST /api/message/delete/:id

Delete a contact form message by its ID. Only authenticated users with the role of "admin" can access this endpoint.

### GET /api/users

Allow administrators to list current users. Only authenticated users with the role of "admin" can access this endpoint.

### GET /api/user/:id

Retrieve a specific user by its ID. Only authenticated users with the role of "admin" can access this endpoint.

### POST /api/user/update/:id

Update any user by its ID. Only authenticated users with the role of "admin" can access this endpoint.

### POST /api/user/add-reader

Allow administrators to add a new user with the role of "reader". Only authenticated users with the role of "admin" can access this endpoint.
