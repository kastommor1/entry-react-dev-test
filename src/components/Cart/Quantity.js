import React from "react";
import "../../styles/Cart/Quantity.css"

class Quantity extends React.Component{
    render(){        
        const {products} = this.props;     
        
        const quantity = products.reduce((sum, product)=>{         
            return sum + parseFloat(product.quantity);
        }, 0);
  
        return(
            <div className="quantity">
                <p>Quantity: </p>
                <p>{quantity}</p>
            </div>
        )
    }
}

export default Quantity;