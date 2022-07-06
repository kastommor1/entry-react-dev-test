import React from "react";
import "../../styles/Cart/Tax.css"

class Tax extends React.Component{
    render(){        
        const {products, currentCurrency, currencies, taxPercentage } = this.props;
        const currentSymbol = currencies.find(currency => currency.label === currentCurrency).symbol             

        const totalPrice = products.reduce((sum, product)=>{
            const currenPrice = product.prices.find(price=>price.currency.label === currentCurrency);            
            const currenAmount = currenPrice.amount * product.quantity;        
            return sum + parseFloat(currenAmount);
        }, 0);

        const taxAmount = totalPrice * taxPercentage /100;

        return(
            <div className="tax">
                <p>Tex {taxPercentage}%: </p>
                <p>{currentSymbol}{taxAmount.toFixed(2)}</p>
            </div>
        )
    }
}

export default Tax;