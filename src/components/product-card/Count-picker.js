import React from "react";
import "../../styles/product-card/Count-picker.css"

class CountPicker extends React.Component {
    
    render() {
        const {hashID, quantity, onQuantityChange} = this.props;       
        return (
            <div className="count-picker">
                <button onClick={()=>{onQuantityChange(hashID, true)}}>+</button>
                <p>{quantity}</p>
                <button onClick={()=>{onQuantityChange(hashID)}}>-</button>
            </div>
        )
    }
}

export default CountPicker;