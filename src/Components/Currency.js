import React from "react";

class Currency extends React.Component{
    render(){
        const {currencies, currentCurrency,  onSetCurrentCurrency} = this.props;
        console.log(currencies, currentCurrency);

        return(
            <div>
                <button className="header-icon">{currentCurrency}</button>
            </div>
        )
    }
}

export default Currency;