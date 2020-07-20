import { gql } from 'apollo-server-express'

export default global = gql`
   type Query {
      _: String
   }

   type Mutation {
      _: String 
   }
`