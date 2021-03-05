import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const link = new HttpLink({
  uri: "https://p38n6r66.api.sanity.io/v1/graphql/production/default",
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  ssrMode: true,
  link,
  cache,
});

export default client;
