import { gql } from "@apollo/client";

export const GET_CATEGORIES_NAME = gql`
    query GetCategoriesName{
        categories{
            name
        }
    }
`;
