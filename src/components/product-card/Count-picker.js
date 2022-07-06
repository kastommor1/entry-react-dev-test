import React from "react";
import "../../styles/product-card/Count-picker.css"

class CountPicker extends React.Component {
    
    render() {
        const {id, quantity, onQuantityChange} = this.props;       
        return (
            <div className="count-picker">
                <button onClick={()=>{onQuantityChange(id, true)}}>+</button>
                <p>{quantity}</p>
                <button onClick={()=>{onQuantityChange(id)}}>-</button>
            </div>
        )
    }
}

export default CountPicker;