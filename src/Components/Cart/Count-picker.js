import React from "react";
import "../../styles/Cart/Count-picker.css"

class CountPicker extends React.Component {
    render() {
        return (
            <div className="count-picker">
                <button>+</button>
                <p>{this.props.quantity}</p>
                <button>-</button>
            </div>
        )
    }
}

export default CountPicker;