import React from "react";
import '../../styles/product-card/Product-card.css'

import Price from "./Price";
import GalleryStock from "./Gallery-stock";
import AddButton from "./Add-button";
import { NavLink } from "react-router-dom";

class ProductCard extends React.Component {

    render() {
        const { product, onAddToCart} = this.props;
        const { id, name, inStock, gallery, prices, brand, category } = product;

    
        return (
            <div className="product-card">

                <NavLink to={'/categories/' + category + '/product/' + id} >

                    <GalleryStock inStock={inStock} gallery={gallery} name={name} />

                    <p className="name" >{brand} {name}</p>

                    <Price prices={prices} currentCurrency={this.props.currentCurrency} />

                </NavLink>

                <AddButton                    
                    cart = {this.props.cart}                    
                    product={product}
                    onAddToCart={onAddToCart}                    
                />
            </div>
        )
    }
}

export default ProductCard
