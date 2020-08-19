import { ApolloServer }  from 'apollo-server-express'
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

require('dotenv').config() 

const app = express()
app.use(cookieParser())
app.use(cors({
<<<<<<< HEAD
  origin: 'http://localhost:3000',
=======
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
>>>>>>> 548549ac710de538e7fc229cf4674f1a2b7ca920
  credentials: true
}))
app.disable('x-powered-by')

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connection success!"))
  .catch((e) => console.log(e));



const server = new ApolloServer({
   typeDefs, 
   resolvers,
   context: req => req,
   playground: process.env.NODE_ENV !== 'production',
})

server.applyMiddleware({ 
  app, 
  path: '/',
  cors: false
})

app.listen({ port: process.env.PORT }, () =>
  console.log('Now browse to http://localhost: '+ process.env.PORT + server.graphqlPath)
)
