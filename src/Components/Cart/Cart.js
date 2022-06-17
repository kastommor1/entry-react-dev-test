import React from "react";
import cartIcon from "../../data/Empty-Cart.svg";
import "../../styles/Cart/Cart.css"
import Modal from "../Modal";
import ProductCardInCart from "../product-card/Product-card-in-cart";

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.handleToggleModal = this.handleToggleModal.bind(this);
    }

    handleToggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        const filteredCart = this.props.cart.filter(product => product.quantity > 0)

        return (
            <div className="cart-mini">
                <div onClick={this.handleToggleModal} className="cart-icon">
                    <button className="header-icon"> <img src={cartIcon} alt="fff" /></button>
                    {filteredCart.length > 0 && <b className="count-icon">{filteredCart.length}</b>}
                </div>


                <Modal
                    onToggleModal={this.handleToggleModal}
                    showModal={this.state.showModal}
                >
                    <div className="cart-list">
                        <h2><b>My Bag,</b> {filteredCart.length} items</h2>

                        {filteredCart.map(product => (
                            <ProductCardInCart
                                key={product.id}
                                product={product}
                                onQuantityChange={this.props.onQuantityChange}
                                onAttributeChange={this.props.onAttributeChange}
                                currentCurrency= {this.props.currentCurrency}
                            />
                        ))}

                        <p>Total: 200$</p>

                    </div>

                </Modal>               


            </div>
        )
    }
}

export default Cart;