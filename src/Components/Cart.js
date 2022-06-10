import React from "react";
import cart from "../data/Empty-Cart.svg";
import "../styles/Cart.css"
import ProductCardInCart from "./product-card/Product-card-in-cart";

class Cart extends React.Component{
    constructor(props){
        super(props);        
        this.state = {
            showCart: false
        };
        this.showCart = this.showCart.bind(this);        
    }

    showCart(){
        this.setState({showCart: !this.state.showCart});       
    }

    render(){      
        return(
            <div className="cart-mini">
                <div onClick={this.showCart} className="cart-icon">
                    <button className="header-icon"> <img src={cart} alt="fff" /></button>
                    {this.props.cart.length > 0 && <b className="count-icon">{this.props.cart.length}</b>}
                </div>                  
                                  
                <div               
                className= {"cart-list" + (this.state.showCart ? ' cart-show' : '')}               
                >
                    <h2><b>My Bag,</b> {this.props.cart.length} items</h2>

                    {this.props.cart.map(product=>(
                        <ProductCardInCart 
                        key={product.id} 
                        product={product} 
                        onQuantityChange={this.props.onQuantityChange}
                        onAttributeChange={this.props.onAttributeChange}                        
                        />
                    ))}

                </div>
                
                
            </div>
        )
    }
}

export default Cart;