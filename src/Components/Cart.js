import React from "react";
import cart from "../data/Empty-Cart.svg";
import "../styles/App/Cart.css"

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
                <div className="cart-count">
                    <button onClick={this.showCart}> <img src={cart} alt="fff" /></button>
                    {this.props.cart.length > 0 && <b className="product-count">{this.props.cart.length}</b>}
                </div>                  
                                  
                <div 
                style={{position: 'absolute', 
                right: 10, 
                top: 85,
                display: this.state.showCart ? 'block': 'none',
                background: 'white',
                border: '1px solid black',
                padding: 15 }}>
                    <p><b>My Bag,</b> {this.props.cart.length} items</p>

                    {this.props.cart.map(product=>{
                        const {id, name, inStock, gallery, prices, brand, quantity} = product
                        return (
                            <div key={id}>
                            <img src={gallery[0]} alt=""  style={{height: 150}}/>
                            <p>{brand} {name}</p>
                            <p><b>{prices[0].currency.symbol}{prices[0].amount}</b></p>
                            <hr />
                        </div>
                        )
                     
                    })}

                </div>
                
                
            </div>
        )
    }
}

export default Cart;