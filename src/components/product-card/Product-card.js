import React from "react";
import '../../styles/product-card/Product-card.css'

import Price from "./Price";
import GalleryStock from "./Gallery-stock";
import AddButton from "./Add-button";
import { NavLink } from "react-router-dom";

class ProductCard extends React.Component {

    render() {
        const { product, onAddToCart, onDeleteFromCart} = this.props;
        const { id, name, inStock, gallery, prices, brand, quantity, category } = product;

    
        return (
            <div className="product-card">

                <NavLink to={'/categories/' + category + '/product/' + id} >

                    <GalleryStock inStock={inStock} gallery={gallery} name={name} />

                    <p className="name" >{brand} {name}</p>

                    <Price prices={prices} currentCurrency={this.props.currentCurrency} />

                </NavLink>

                <AddButton
                    inStock={inStock}
                    quantity={quantity}
                    product={product}
                    onAddToCart={onAddToCart}
                    onDeleteFromCart={onDeleteFromCart} 
                />
            </div>
        )
    }
}

export default ProductCard
