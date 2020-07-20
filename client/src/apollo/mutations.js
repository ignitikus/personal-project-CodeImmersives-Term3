import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation($username: String!, $email: String!, $password: String!){
       register(username: $username, email: $email, password: $password){ 
          id,
          username,
          email
       }
    }
  
`

export const SAVE_MUSIC_PIECE = gql`
   mutation($author: ID!, $composition:[CompositionInput!]){
      saveComposition(author:$author, composition: $composition){
         author
      }
   }
`