import React from "react";
import cartIcon from "../data/Empty-Cart.svg";
import "../styles/Cart.css"
import ProductCardInCart from "./product-card/Product-card-in-cart";

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCart: false
        };
        this.showCart = this.showCart.bind(this);
    }

    showCart() {
        this.setState({ showCart: !this.state.showCart });
    }

    render() {
        const filteredCart = this.props.cart.filter(product => product.quantity > 0)

        return (
            <div className="cart-mini">
                <div onClick={this.showCart} className="cart-icon">
                    <button className="header-icon"> <img src={cartIcon} alt="fff" /></button>
                    {filteredCart.length > 0 && <b className="count-icon">{filteredCart.length}</b>}
                </div>

                <div
                    className={"modal" + (this.state.showCart ? ' cart-show' : '')}
                >

                    <div 
                    className="eclipse"
                    onClick={this.showCart}
                    >
                        <div className="header-eclipse"></div>
                        <div className="main-eclipse"></div>                     
                    </div>

                    <div className={"cart-list" + (this.state.showCart ? ' unfold' : '') }>
                        <h2><b>My Bag,</b> {filteredCart.length} items</h2>

                        {filteredCart.map(product => (
                            <ProductCardInCart
                                key={product.id}
                                product={product}
                                onQuantityChange={this.props.onQuantityChange}
                                onAttributeChange={this.props.onAttributeChange}
                            />
                        ))}

                    </div>


                </div>


            </div>
        )
    }
}

export default Cart;