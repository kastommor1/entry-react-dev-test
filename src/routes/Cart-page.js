import React from "react";
import { Link } from "react-router-dom";

//style
import "../styles/Cart/Cart-page.css";

//components
import ProductCardInCart from "../components/product-card/Product-card-in-cart";
import TotalPrice from "../components/Cart/Total-price";
import Tax from "../components/Cart/Tax";
import Quantity from "../components/Cart/Quantity";

class CartPage extends React.Component {
    render() {
        document.title = 'Cart';
        const cart = this.props.cart;

        return (
            <div className="cart-page">
                <h2>Cart</h2>

                {cart.map(product => (
                    <ProductCardInCart
                        key={product.hashID}
                        product={product}
                        onQuantityChange={this.props.onQuantityChange}
                        onAttributeChange={this.props.onAttributeChange}
                        currentCurrency={this.props.currentCurrency}

                        showGalleryArrows={true}
                    />
                ))}

                <div className="price-table">
                    <Tax
                        products={cart}
                        currentCurrency={this.props.currentCurrency}
                        currencies={this.props.currencies}
                        taxPercentage={21}
                    />

                    <Quantity products={cart} />

                    <TotalPrice
                        products={cart}
                        currentCurrency={this.props.currentCurrency}
                        currencies={this.props.currencies}
                    />
                </div>

                {cart.length > 0 &&

                    <Link to="/order">
                        <button
                            className="order-button"
                            onClick={this.props.onOrder}
                        >
                            Order</button>
                    </Link>
                }





            </div>
        )
    }
}

export default CartPage;