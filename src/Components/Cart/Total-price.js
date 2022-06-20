import React from "react";
import "../../styles/Cart/Total-price.css"

class TotalPrice extends React.Component{
    render(){        
        const {products, currentCurrency, currencies} = this.props;
        const currentSymbol = currencies.find(currency => currency.label === currentCurrency).symbol             

        const totalPrice = products.reduce((sum, product)=>{
            const currenPrice = product.prices.find(price=>price.currency.label === currentCurrency);            
            const currenAmount = currenPrice.amount ;        
            return sum + parseFloat(currenAmount);
        }, 0);

        return(
            <div className="total-price">
                <p>Total: </p>
                <p>{currentSymbol} {totalPrice.toFixed(2)}</p>
            </div>
        )
    }
}

export default TotalPrice;