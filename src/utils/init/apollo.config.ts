import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_BACKEND_URL_DEV + "/graphql",
	cache: new InMemoryCache(),
});
