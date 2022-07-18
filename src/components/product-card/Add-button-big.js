import React from "react";
import "../../styles/product-card/Add-button.css";

class AddButtonBig extends React.Component {


    render() {
        const {cart, product, onAddToCart, onDeleteFromCart} = this.props;
        const cartProduct = cart.find(cartProduct => cartProduct.hashID === product.hashID);     
        
        

        if (!product.inStock) {
            return (
                <button className="stock-btn">
                    Out of stock
                </button>
            )
        }
        
        if (!cartProduct) {
            return (
                <button
                    className="add-btn"
                    onClick={() => { onAddToCart(product) }}
                >
                    Add to cart
                </button>
            )
        } else {
            return (
                <button
                    className="dell-btn"
                    onClick={() => { onDeleteFromCart(product.hashID) }}
                >
                    Remove from cart
                </button>
            )
        }
    }
}

export default AddButtonBig;