import React from "react";
import "../../styles/product-card/Add-button.css";

class AddButtonBig extends React.Component {


    render() {
        const {inStock, quantity, product} = this.props;        

        if (!inStock) {
            return (
                <button className="stock-btn">
                    Out of stock
                </button>
            )
        }
        
        if (!quantity) {
            return (
                <button
                    className="add-btn"
                    onClick={() => { this.props.onAddToCart(product) }}
                >
                    Add to cart
                </button>
            )
        } else {
            return (
                <button
                    className="dell-btn"
                    onClick={() => { this.props.onDeleteFromCart(product.id) }}
                >
                    Remove from cart
                </button>
            )
        }
    }
}

export default AddButtonBig;