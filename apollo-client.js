import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    // uri: "https://plan-a-nijmegen-strapi-production.up.railway.app/graphql",
    uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
});

export default client;