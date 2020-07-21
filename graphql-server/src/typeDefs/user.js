import { gql } from 'apollo-server-express'

export default gql`
   extend type Query {
      login(email: String!, password: String!): User
      getUserInfo(id:ID!): User
      users: [User!]!
      compositions: [PianoPiece!]!
      userCompositions(id: ID): [PianoPiece]
   }

   extend type Mutation {
      register(
         email: String!, 
         username: String!, 
         password: String!) : User
      saveComposition(
         author: ID!
         name: String!
         composition: [CompositionInput!]
      ): PianoPiece!
      deleteComposition(
         id: ID!
      ): PianoPiece!

   }

   type User {
      id: ID!
      email: String!
      username: String!
      createdAt: String!
   }

   type PianoPiece {
      author: ID!
      name: String!
      composition: [Composition!]
      id: ID!
      createdAt: String!
      updatedAt: String!
   }

   type Composition {
      key: String!
      difference: Int!
   }

   input CompositionInput {
      key: String!
      difference: Int!
   }

`