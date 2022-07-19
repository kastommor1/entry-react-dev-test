import React from "react";
import "../../styles/product-card/Add-button.css";
import { Link } from "react-router-dom"

class AddButtonBig extends React.Component {


    render() {
        const { cart, product, onAddToCart } = this.props;
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
                <Link to={'/cart'}>
                    <button className="dell-btn">
                        In the cart
                    </button>
                </Link>

            )
        }
    }
}

export default AddButtonBig;