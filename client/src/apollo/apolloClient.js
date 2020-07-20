import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookie from 'js-cookie'

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = Cookie.get('access-token')
  const refresh = Cookie.get('refresh-token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      refresh: refresh ? `Bearer ${refresh}` : ""
    }
  }
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})