import React from "react";
import cart from "../../data/Empty-Cart-White.svg";
import "../../styles/product-card/Add-button.css";

class AddButton extends React.Component {


    render() {
        const {inStock, quantity, product} = this.props;
        if (!inStock) return ;
        
        if (!quantity) {
            return (
                <button
                    className="add-dell"
                    onClick={() => { this.props.onAddToCart(product) }}
                >
                    <img src={cart} alt="add" />
                </button>
            )
        } else {
            return (
                <button
                    className="add-dell dell-btn"
                    onClick={() => { this.props.onDeleteFromCart(product.id) }}
                >
                    <img src={cart} alt="add-blocked" />
                </button>
            )
        }
    }
}

export default AddButton;