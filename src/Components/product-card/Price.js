import React from "react";
import "../../styles/product-card/Price.css"

class Price extends React.Component{
    
    render(){
        const prices = this.props.prices;
        return(
            <p className="price"><b>{prices[0].currency.symbol}{prices[0].amount}</b></p>
        )
    }
}

export default Price;