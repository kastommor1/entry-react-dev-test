import React from "react";
import '../../styles/product-card/Product.css'
import Attributes from "./Attributes";
import CountPicker from "./Count-picker";
import Gallery from "./Gallery";
import Price from "./Price";


class ProductCardInCart extends React.Component {

    render() {
        const product = this.props.product;
        const { id, name, inStock, gallery, prices, brand, quantity, attributes } = product;

        return (
            <div className="product-card-in-cart">

                <div className="parameters">
                    <div>
                        <h3 className="brand">{brand}</h3>
                        <h3 className="name">{name}</h3>
                    </div>
                    
                    <Price prices={prices} currentCurrency={this.props.currentCurrency} />
                    <Attributes
                        productId={product.id}
                        attributes={attributes}
                        onAttributeChange={this.props.onAttributeChange}
                    />
                </div>

                <CountPicker
                    id={id}
                    quantity={quantity}
                    onQuantityChange={this.props.onQuantityChange}
                />
                <Gallery gallery={gallery} name={name} />
            </div>
        )
    }
}

export default ProductCardInCart;
