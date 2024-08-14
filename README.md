## Getting Started

First run the setup:

```bash
npm run install

npm run setup
# And accept the creation of the database.
```

This gonna install the dependecies required, create the database for the development server and setup the .env files from the .env.example on each folder.

Then, run the development server:

```bash
npm run dev:api
#and
npm run dev:front
```

## Api Endpoints

### User Endpoints

```
GET /api/user

response:
  200 Paginated users filtered by the Search Parameter
```

```
GET /api/user/{id}

params:
  id: User id

response:
  200 User with that id or empty
```

```
POST /api/user

body:
  name: Name of User
  surname: Surname of User
  email: Email of User
  telephone: Telephone of User
  birthDate: Birthdate of User
  cep: Code of address
  street: Street that User lives
  state: State that User lives
  city: City that User lives

response:
  202 Data of user created
  400 Errors Messages
```

```
PUT /api/user/{id}

params:
  id: Id of User to be Updated

body:
  name: Name of User
  surname: Surname of User
  email: Email of User
  telephone: Telephone of User
  cep: Code of address
  street: Street that User lives
  state: State that User lives
  city: City that User lives

response:
  202 Updated data of User
  400 Errors messages
```

```
DELETE /api/user/{id}

params:
  id: Id of User to be deleted

response:
  202 Success Message
  400 User not found
```

### Card Endpoints

```
GET /api/card/{id}

params:
  id: User Id

response:
  200 Data of all the cards from that User
```

```
POST /api/card/

body:
  number: Card Number
  cvv: CVV Code
  expiredAt: Expiration Date
  user_id: User Id

response:
  200 Data of created card
  400 Error message
```

```
DELETE /api/card/{id}

params:
  id: Card Id to be deleted

response:
  200 Success Message
```
