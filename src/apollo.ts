import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { auth } from "./firebase"; // optional: to send ID token

const httpLink = createHttpLink({
  uri: "https://uno-graphql-web-3.vercel.app/api/graphql",
  fetch
});

// (optional but recommended) include Firebase ID token for auth
const authLink = setContext(async (_, { headers }) => {
  const token = await auth.currentUser?.getIdToken().catch(() => null);
  return { headers: { ...headers, ...(token ? { Authorization: `Bearer ${token}` } : {}) } };
});

export const apollo = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
