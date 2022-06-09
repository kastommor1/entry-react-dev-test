import React from "react";
import '../../styles/product-card/Product-card.css'
import cart from "../../data/Empty-Cart-White.svg";
import Price from "./Price";
import GalleryStock from "./Gallery-stock";

class ProductCard extends React.Component {

    render() {
        const product = this.props.product;
        const { id, name, inStock, gallery, prices, brand, quantity } = product;   

        return (
            <div className="product-card">               

                <GalleryStock inStock={inStock} gallery={gallery} name={name}/>
                <p className="product-name" >{brand} {name}</p>
                <Price prices={prices} />

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
