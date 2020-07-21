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
   mutation($author: ID!, $composition:[CompositionInput!], $name: String!){
      saveComposition(author:$author, composition: $composition, name: $name){
         author
      }
   }
`
export const DELETE_COMPOSITION_BY_ID = gql`
   mutation($id: ID!){
      deleteComposition(id: $id){
         id
         author
      }
   }
`