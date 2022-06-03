import React from "react";
import { widthQueryByParams  } from "../HOCs/HOCs"
import { GET_CATEGORY } from "../apollo-client/queries";
import WarningMessage from "../components/Warning-message";
import { element } from "prop-types";
import ProductCard from "../components/Category/Product-card";


class Category extends React.Component{   
   
    render(){
        if(this.props.categoriesName.filter(category=>category.name == this.props.categoryName ).length === 0) {
            return (
            <WarningMessage>              
                <p>Sorry. There is no such category.</p>
            </WarningMessage>)}       
    
        
        const {loading, error , data} = this.props.query;
  
        return (
            <div>
                <h2>{this.props.categoryName.toLocaleUpperCase()}</h2>
                
                {loading && <p>Loading...</p>}
                {error && 
                <WarningMessage>
                    <p>Error {error.message}</p>
                </WarningMessage>}

                {(data && data.category && data.category.products.length > 0) ? 
                 data.category.products.map(product=>{
                     
                    let filteredProduct = product;                    
                     for (const selectProduct of this.props.cart) {
                         if (selectProduct.id == product.id) {
                             filteredProduct = selectProduct;                              
                         }
                     }                

                     return  (
                        <ProductCard 
                        key={product.id} 
                        product={filteredProduct} 
                        onAddToCart = {this.props.onAddToCart}                 
                        />
                    )
                 })
                : <WarningMessage>No categories</WarningMessage> }

            </div>
        )
    }
}

const CategoryHOC = widthQueryByParams(Category, GET_CATEGORY, 'categoryName');

export default CategoryHOC;