import React from "react";
import {Link} from "react-router-dom";

//style
import '../../styles/product-card/Product.css'

//component
import Attributes from "./Attributes";
import CountPicker from "./Count-picker";
import Gallery from "./Gallery";
import Price from "./Price";


class ProductCardInCart extends React.Component {

    render() {
        const product = this.props.product;
        const { id, name, inStock, gallery, prices, brand, quantity, attributes, category } = product;

        return (
            <div className="product-card-in-cart">

                <div className="parameters">
                    <Link to={'/categories/' + category + '/product/' + id}  target="_blank">
                        <h3 className="brand">{brand}</h3>
                        <h3 className="name">{name}</h3>
                    </Link>

                    <Price prices={prices} currentCurrency={this.props.currentCurrency} />
                    <Attributes
                        productId={product.id}
                        attributes={attributes}
                        onAttributeChange={this.props.onAttributeChange}
                        lockAttributeChange = {true}
                    />
                </div>

                <CountPicker
                    id={id}
                    quantity={quantity}
                    onQuantityChange={this.props.onQuantityChange}
                />

                <Gallery
                    gallery={gallery}
                    name={name}
                    showGalleryArrows={this.props.showGalleryArrows}
                />
            </div>
        )
    }
}

export default ProductCardInCart;
