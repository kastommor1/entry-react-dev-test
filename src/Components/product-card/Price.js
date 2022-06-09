import React from "react";

class Price extends React.Component{
    
    render(){
        const prices = this.props.prices;
        return(
            <p><b>{prices[0].currency.symbol}{prices[0].amount}</b></p>
        )
    }
}

export default Price;