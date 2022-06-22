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
        },

        // AttributeSet: {
        //     fields: {
        //         items: {
        //             merge(existing, incoming) {
        //                 console.log('AttributeSet', existing, incoming);
        //                 return { ...existing, ...incoming };
        //                 // return incoming;
        //             },
        //         },
        //     },
        // },

        // Attribute: {
        //     fields: {
        //         items: {
        //             merge(existing, incoming) {
        //                 console.log('Attribute', existing, incoming);
        //                 return { ...existing, ...incoming };
        //             },
        //         },
        //     },
        // },

    },
});

export const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: cache
});

