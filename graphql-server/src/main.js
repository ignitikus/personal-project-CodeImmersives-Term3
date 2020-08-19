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
  origin: 'http://nikokim.com',
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