import React from "react";
import '../../styles/product-card/Product-card.css'
import cart from "../../data/Empty-Cart-White.svg";

class ProductCard extends React.Component {

    render() {
        const product = this.props.product;
        const { id, name, inStock, gallery, prices, brand, quantity } = product;
        const imgClass = inStock ? '' : 'product-stock-img';
        const hiddenClass = inStock ? '' : 'product-hidden';

        return (
            <div className="product-card">

                <div className="product-gallery">
                    <img className={imgClass} src={gallery[0]} alt={name} />
                    {!inStock && <p className="product-stock">OUT OF STOCK</p>}
                </div>
                <p className="product-name" >{brand} {name}</p>
                <p><b>{prices[0].currency.symbol}{prices[0].amount}</b></p>

                {inStock && 
                <div>
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
                </div>}

            </div>
        )
    }
}

export default ProductCard
