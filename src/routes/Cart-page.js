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
        const filteredCart = this.props.cart.filter(product => product.quantity > 0);

        return (
            <div className="cart-page">
                <h2>Cart</h2>

                {filteredCart.map(product => (
                    <ProductCardInCart
                        key={product.id}
                        product={product}
                        onQuantityChange={this.props.onQuantityChange}
                        onAttributeChange={this.props.onAttributeChange}
                        currentCurrency={this.props.currentCurrency}

                        showGalleryArrows={true}
                    />
                ))}

                <div className="price-table">
                    <Tax
                        products={filteredCart}
                        currentCurrency={this.props.currentCurrency}
                        currencies={this.props.currencies}
                        taxPercentage={21}
                    />

                    <Quantity products={filteredCart} />

                    <TotalPrice
                        products={filteredCart}
                        currentCurrency={this.props.currentCurrency}
                        currencies={this.props.currencies}
                    />
                </div>

                <Link to="/order">
                    <button className="order-button">Order</button>
                </Link>



            </div>
        )
    }
}

export default CartPage;