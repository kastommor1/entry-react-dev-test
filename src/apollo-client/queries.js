import { gql } from "@apollo/client";

export const GET_CATEGORIES_NAME = gql`
    query GetCategoriesName{
        categories{
            name
        }
    }
`;

export const GET_CATEGORY = gql`
    query GetCategory($input: CategoryInput){
        category(input: $input){
            name
            products{
                id
                name
                brand
                inStock
                gallery
                category
                description
                prices{
                    currency{
                        label
                        symbol
                    }
                    amount
                }
                attributes{
                    id
                    name
                    type
                    items{
                        displayValue
                        value
                        id
                    }
                }                
            }
        }
    }
`;

export const GET_PRODUCT = gql`
    query GetProduct($id: String!) {
        product(id: $id) {
            id
            name
            brand
            inStock
            gallery
            category
            description
            prices{
                currency{
                    label
                    symbol
                }
                amount
            }
            attributes{
                id
                name
                type
                items{
                    displayValue
                    value
                    id
                }
            }                
        }
    }
`;