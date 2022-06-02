import React from "react";
import { widthQueryByParams  } from "../HOCs/HOCs"
import { GET_CATEGORY } from "../apollo-client/queries";
import WarningMessage from "../components/Warning-message";
import { element } from "prop-types";

class Category extends React.Component{

    render(){
        if(this.props.categoriesName.filter(category=>category.name == this.props.categoryName ).length === 0) {
            return (
            <WarningMessage>              
                <p>Sorry. There is no such category.</p>
            </WarningMessage>)}       
    
        
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
                : <WarningMessage>No categories</WarningMessage> }

            </div>
        )
    }
}

const CategoryHOC = widthQueryByParams(Category, GET_CATEGORY, 'categoryName');

export default CategoryHOC;