import React from "react";

class ProductCard extends React.Component {
    


    render(){
        const product = this.props.product;
        const {id, name, inStock, gallery, prices, brand, quantity} = product;
      
        return (
            <div style={{border: '1px solid black'}}>
                <img src={gallery[0]} alt=""  style={{height: 150}}/>
                <p>{brand} {name}</p>
                <p><b>{prices[0].currency.symbol}{prices[0].amount}</b></p>
                {quantity && <p><b style={{color: 'red'}}>In cart</b></p>}
                <button onClick={()=>{this.props.onAddToCart(product)}}>Add to cart</button>                
            </div>
        )
    }
}

export default ProductCard
