import { ApolloClient, InMemoryCache } from "@apollo/client";

// const cache = new InMemoryCache()

const cache = new InMemoryCache({
    typePolicies: {
        Product: {
            fields: {
                attributes: {
                    merge(existing, incoming) {
                        // return { ...existing, ...incoming };
                        return { ...incoming };
                    },
                },
            },
        }
    },
});

export const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: cache
});

