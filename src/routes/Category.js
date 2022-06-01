import React from "react";
import { widthQueryByParams  } from "../HOCs/HOCs"
import { GET_CATEGORY } from "../apollo-client/queries";
import { getCategoriesName } from "../data";

class Category extends React.Component{

    render(){        
        const {loading, error , data} = this.props.query; 

        // if(loading) return <p>Loading...</p>
        // if(error) return <p>Error {error.message}</p>    
        // if(data && data.category) {}

        return (
            <div>
                <h2>{this.props.categoryName.toLocaleUpperCase()}</h2>
                
                {loading && <p>Loading...</p>}
                {error && <p>Error {error.message}</p>}

                {(data && data.category) ? 
                 data.category.products.map(product=>(<p key={product.id}>{product.name}</p>))
                : <p>No categories</p> }

            </div>
        )
    }
}

const CategoryHOC = widthQueryByParams(Category, GET_CATEGORY, 'categoryName');

export default CategoryHOC;