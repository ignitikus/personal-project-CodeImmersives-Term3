import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    users{
       username
       email
    }
  }
`

export const GET_USER_BY_ID = gql`
  query($id: ID!) {
    getUserInfo(id: $id){
      id
      username
      email
    }
  }
`

export const LOGIN = gql`
  query($email: String!, $password: String!){
    login(email: $email, password: $password){
      id
      username
      email
    }
  }
`

export const GET_ALL_COMPOSITIONS = gql`
  query{
    compositions{
      author
      compositions
      id
    }
  }
`

export const GET_USER_COMPOSITIONS = gql`
  query($id: ID){
    userCompositions(id: $id){
      id
      name
      author
      updatedAt
      composition{
        key
        difference
      }
    }
  }
`