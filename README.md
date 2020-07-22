# ITSY BITSY PIANO

### Personal project @Code Immersives Term 3 (pre-AWS deployment)

### Description:
Simple piano app.

Client side was build with: 
   * React (with hooks)
   * Redux (state container)
   * Redux-thunk (handles asynchronicity)
   * GraphQL and Apollo Client (Manipulation language for API - calls and receives data from backend)
   * Howler (Audio output)
   * React-toastify (Prettier notification messages)
   * js-cookie (Cookies retrieval and manipulation)
   * jwt-decode (Decodes tokens)

Server side was build with:
   * Apollo-Server-Express (Connect express and GraphQL)
   * ESM (Allow usage of 'import/export' and more)
   * Mongoose (Object modeling for MongoDB)
   * bcryptjs (hash and salt)
   * cookie-parser
   * jsonwebtoken (security tokens)
   * joi (Data validator)
   * dotenv (Enables environmental variables)

Instructions for local installation:
   1. Fork and clone this repo
   2. Install dependencies
      * `cd /client && npm install` 
      * `cd /graphql-server && npm install` 
   3. In `/graphql-server` folder create `.env` file - it will hold all variables you want to hide from github (secrets, ports, paths)
   4. in `.env` create 4 variables: 
      ```
      PORT = "PORT_YOU_WANT_YOUR_BACKEND_TO_RUN_ON"
      MONGODB_URI = "PATH_TO_YOUR_MONGO_DB"
      JWT_USER_SECRET_KEY = "secret1"
      JWT_USER_REFRESH_SECRET_KEY = "SECRET2"