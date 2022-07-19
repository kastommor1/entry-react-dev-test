import React from "react";

//style
import cartIcon from "../../data/Empty-Cart.svg";
import "../../styles/Cart/Cart.css";

//components
import Modal from "../Modal";
import ProductCardInCart from "../product-card/Product-card-in-cart";
import TotalPrice from "./Total-price";

import { Link } from "react-router-dom"

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.handleToggleModal = this.handleToggleModal.bind(this);
        this.onOrder = this.onOrder.bind(this);
    }

    handleToggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    onOrder() {
        this.props.onOrder();
        this.handleToggleModal();
    }

    render() {      
        const {cart, onQuantityChange, onAttributeChange, currentCurrency, currencies} = this.props;



        const quantity = cart.reduce((sum, product)=>{         
            return sum + parseFloat(product.quantity);
        }, 0);


        return (
            <div className="cart-mini">
                <div onClick={this.handleToggleModal} className="cart-icon">
                    <button className="header-icon"> <img src={cartIcon} alt="fff" /></button>
                    {cart.length > 0 && <b className="count-icon">{quantity}</b>}
                </div>


                <Modal
                    onToggleModal={this.handleToggleModal}
                    showModal={this.state.showModal}
                >
                    <div className="cart-list">
                        <h2><b>My Bag,</b> {quantity} items</h2>

                        <div className="list">
                            {cart.map(product => (
                                <ProductCardInCart
                                    key={product.hashID}
                                    product={product}
                                    onQuantityChange={onQuantityChange}
                                    onAttributeChange={onAttributeChange}
                                    currentCurrency={currentCurrency}
                                />
                            ))}
                        </div>



                        <TotalPrice
                            products={cart}
                            currentCurrency={currentCurrency}
                            currencies={currencies}
                        />

                        {cart.length > 0 &&
                        
                            <div className="links-button">
                                <Link to={'/cart'}>
                                    <button onClick={this.handleToggleModal}>
                                        View bag
                                    </button>
                                </Link>

                                <Link
                                    to={'/order'}
                                >
                                    <button onClick={this.onOrder}>
                                        Check out
                                    </button>
                                </Link>
                            </div>
                        }
                    </div>

                </Modal>


            </div>
        )
    }
}

export default Cart;