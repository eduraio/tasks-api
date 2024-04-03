<h1 align="center">Tasks API</h1>

## Description
Tasks API is a simples project to create tasks with users permissions.

**Technologies**
- Nest.js
- Prisma (With PostgresSQL)
- Docker

**My Requirements**
- Task name must be unique
- Only allowed users can create tasks

## Installation
> 1 - Clone the repository
```bash
git clone https://github.com/eduraio/tasks-api.git
```
> 2 - Install Dependecies
```bash
yarn install
```
> 3 - Populate .env file based on .env.example
```env
DATABASE_URL="postgresql://user:password@localhost:5432/database?schema=public"
JWT_SECRET=
```
*Postgres User, Password and Database available on docker-compose.yml*

*Generate a JWT Secret, you can run the following script to generate yours:*

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
> 4 - Run docker-compose
```bash
docker-compose up
```
> 5 - Run Prisma Migrations
```bash
yarn prisma migrate dev
```
> 6 - Run Prisma Seed
```bash
yarn prisma db seed
```

## Usage
To start the project use:
```bash
yarn start
```

To access the API Documentation
```
http://localhost:3000/docs
```

Note that all routes, except login, are protected.

Use admin credentials to login and get the AccessToken. *This user is created running Prisma Seed. Check Installation Step 6*
```
e-mail: admin@email.com
password: admin
```

*AccessTokens are valid for 10 minutes*

You will need the AccessToken to authenticate on other routes

# Routes
Here goes all the routes.
You can also check [Docs](http://localhost:3000/docs) for full details.

Included with the files, has an [Insomnia Workspace](https://github.com/eduraio/tasks-api/blob/master/tasks-api-insomnia.json) with all routes as well. Just import it inside Insomnia.

`🔒` **All routes, except login, must have an `Authorization` header containing the accessToken** 

```json
{
  "Authorization": "Bearer {accessToken}"
}
```

## Login 

`🟢 POST` `/auth/login`

Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

Response `Application/json`

```json
{
  "accessToken": "string"
}
```

----

## `🔒` Users 

| Parameter | Description |
|---|---|
| `id` | User UUID |
| `email` `UNIQUE` | User e-mail |
| `password` | User password |
| `permissions` | Array of permissions. All permissions: `READ_USERS` `CREATE_USERS` `UPDATE_USERS` `DELETE_USERS` `READ_TASKS` `CREATE_TASKS` `UPDATE_TASKS` `DELETE_TASKS` |
| `tasks?` | Array of tasks created by this user|
| `created_at` | Date of creation |
| `updated_at` | Last updated date |


`🔵 GET` `/users`

Request Body
```json
{}
```

Response `Application/json`

```json
{
  [
    {
      "id": "string",
      "email": "string",
      "password": "string", (omitted)
      "permissions": [
        "READ_USERS",
        "CREATE_USERS",
        "UPDATE_USERS",
        "DELETE_USERS",
        "READ_TASKS",
        "CREATE_TASKS",
        "UPDATE_TASKS",
        "DELETE_TASKS"
      ],
      "tasks": [],
      "created_at": "date",
      "updated_at": "date"
    }
  ]
}
```

`🔵 GET` `/users/{id}`

Request Body
```json
  {}
```

Response `Application/json`

```json
[
  {
    "id": "string",
    "email": "string",
    "password": "string", (omitted)
    "permissions": [
      "READ_USERS",
      "CREATE_USERS",
      "UPDATE_USERS",
      "DELETE_USERS",
      "READ_TASKS",
      "CREATE_TASKS",
      "UPDATE_TASKS",
      "DELETE_TASKS"
    ],
    "tasks": [],
    "created_at": "date",
    "updated_at": "date"
  }
]
```

`🟢 POST` `/users`

Request Body
```json
{
  "email": "string",
  "password": "string",
  "permissions": [
    "READ_USERS",
    "CREATE_USERS",
    "UPDATE_USERS",
    "DELETE_USERS",
    "READ_TASKS",
    "CREATE_TASKS",
    "UPDATE_TASKS",
    "DELETE_TASKS"
  ]
}
```

Response `Application/json`

```json
{
  "id": "string",
  "email": "string",
  "password": "string", (omitted)
  "permissions": [
    "READ_USERS",
    "CREATE_USERS",
    "UPDATE_USERS",
    "DELETE_USERS",
    "READ_TASKS",
    "CREATE_TASKS",
    "UPDATE_TASKS",
    "DELETE_TASKS"
  ],
  "tasks": [],
  "created_at": "date",
  "updated_at": "date"
}
```

`🟣 PATCH` `/users/{id}`

Request Body
```json
{
  "email": "string",
  "password": "string",
  "permissions": [
    "READ_USERS",
    "CREATE_USERS",
    "UPDATE_USERS",
    "DELETE_USERS",
    "READ_TASKS",
    "CREATE_TASKS",
    "UPDATE_TASKS",
    "DELETE_TASKS"
  ]
}
```

Response `Application/json`

```json
{
  "id": "string",
  "email": "string",
  "password": "string", (omitted)
  "permissions": [
    "READ_USERS",
    "CREATE_USERS",
    "UPDATE_USERS",
    "DELETE_USERS",
    "READ_TASKS",
    "CREATE_TASKS",
    "UPDATE_TASKS",
    "DELETE_TASKS"
  ],
  "tasks": [],
  "created_at": "date",
  "updated_at": "date"
}
```

`🔴 DELETE` `/users/{id}`

Request Body
```json
{}
```

Response `Application/json`

```json
{
  "id": "string",
  "email": "string",
  "password": "string", (omitted)
  "permissions": [
    "READ_USERS",
    "CREATE_USERS",
    "UPDATE_USERS",
    "DELETE_USERS",
    "READ_TASKS",
    "CREATE_TASKS",
    "UPDATE_TASKS",
    "DELETE_TASKS"
  ],
  "tasks": [],
  "created_at": "date",
  "updated_at": "date"
}
```

----

## `🔒` Tasks

| Parameter | Description |
|---|---|
| `id` | Task UUID |
| `name` `UNIQUE` | Task name |
| `description` | Task description |
| `created_by_user_id?` | Id of the user who created the task. If the user is deleted, field set to null. *Note: Automatically populated based on logged in user* |
| `created_by_user?` | User who created the task |
| `created_at` | Date of creation |
| `updated_at` | Last updated date |


`🔵 GET` `/tasks`

Request Body
```json
{}
```

Response `Application/json`

```json
{
  [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "created_by_user_id": "string",
      "created_by_user": "User",
      "created_at": "date",
      "updated_at": "date"
    }
  ]
}
```

`🔵 GET` `/tasks/{id}`

Request Body
```json
  {}
```

Response `Application/json`

```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "created_by_user_id": "string",
    "created_by_user": "User",
    "created_at": "date",
    "updated_at": "date"
  }
]
```

`🟢 POST` `/tasks`

Request Body
```json
{
  "name": "string",
  "description": "string",
}
```

Response `Application/json`

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "created_by_user_id": "string",
  "created_by_user": "User",
  "created_at": "date",
  "updated_at": "date"
}
```

`🟣 PATCH` `/tasks/{id}`

Request Body
```json
{
  "name": "string",
  "description": "string",
}
```

Response `Application/json`

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "created_by_user_id": "string",
  "created_by_user": "User",
  "created_at": "date",
  "updated_at": "date"
}
```

`🔴 DELETE` `/tasks/{id}`

Request Body
```json
{}
```

Response `Application/json`

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "created_by_user_id": "string",
  "created_by_user": "User",
  "created_at": "date",
  "updated_at": "date"
}
```
