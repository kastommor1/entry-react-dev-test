import React from "react";
import '../../styles/Cart/Product-card-in-cart.css'
import Attributes from "./Attributes";
import CountPicker from "./Count-picker";


class ProductCardInCart extends React.Component {

    render() {
        const product = this.props.product;
        const { id, name, inStock, gallery, prices, brand, quantity, attributes } = product;

        return (
            <div className="product-card-in-cart">

                <div className="parameters">              
                    <h3 className="name" > {brand} <br /> {name}</h3>
                    <p><b>{prices[0].currency.symbol}{prices[0].amount}</b></p>

                    <Attributes attributes={attributes}/>                  
                </div>

                <CountPicker quantity={quantity}/>

                <div className="gallery">
                    <img src={gallery[0]} alt={name} />
                </div> 

            </div>
        )
    }
}

export default ProductCardInCart;
