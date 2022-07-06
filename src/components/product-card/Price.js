import React from "react";
import "../../styles/product-card/Price.css"

class Price extends React.Component {

    render() {
        const {prices , currentCurrency} = this.props; 

        const currentPrice = prices.find(price=>price.currency.label === currentCurrency);
        if (currentPrice) {
            const currentSymbol = currentPrice.currency.symbol;       
            const currentAmount = currentPrice.amount

            return (
                <p className="price"><b>{currentSymbol}{currentAmount}</b></p>                         
            )            
        }
        
        return <p>0</p>
            
    ;
           


    }
}

export default Price;