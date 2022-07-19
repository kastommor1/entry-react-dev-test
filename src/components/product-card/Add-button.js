import React from "react";
import cartImg from "../../data/Empty-Cart-White.svg";
import "../../styles/product-card/Add-button.css";

//func
import {setDefaultAttributes, setHashId} from "../../service-functions/data-processing"

class AddButton extends React.Component {


    render() {
        const {cart, product, onAddToCart} = this.props;
        const cartProduct = cart.find(cartProduct => cartProduct.id === product.id);
        const productWithDefaultAttributes = setHashId(setDefaultAttributes(product));        

        if (!product.inStock) return ;       
        
        if (!cartProduct) {
            return (
                <button
                    className="add-dell"
                    onClick={() => {onAddToCart(productWithDefaultAttributes) }}
                >
                    <img src={cartImg} alt="add" />
                </button>
            )
        } else {
            return (
                <button
                    className="add-dell dell-btn"                    
                >
                    <img src={cartImg} alt="add-blocked" />
                </button>
            )
        }
    }
}

export default AddButton;