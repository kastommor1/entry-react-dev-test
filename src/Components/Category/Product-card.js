import React from "react";
import '../../styles/Category/Product-card.css'
import cart from "../../data/Empty-Cart-White.svg";

class ProductCard extends React.Component {

    render() {
        const product = this.props.product;
        const { id, name, inStock, gallery, prices, brand, quantity } = product;

        return (
            <div className="product-card">

                <div className="product-gallery">
                    <img src={gallery[0]} alt={name} />
                </div>
                <p>{brand} {name}</p>
                <p><b>{prices[0].currency.symbol}{prices[0].amount}</b></p>
                {/* {quantity && <p><b style={{color: 'red'}}>In cart</b></p>} */}
                
                {!quantity ?
                    <button 
                        className="add-product-btn"
                        onClick={() => { this.props.onAddToCart(product) }}
                        >
                        <img src={cart} alt="" />
                    </button> :
                    <button 
                        className="dell-product-btn"
                        onClick={() => { this.props.onAddToCart(product) }}
                        >
                        <img src={cart} alt="" />
                    </button>}

            </div>
        )
    }
}

export default ProductCard
