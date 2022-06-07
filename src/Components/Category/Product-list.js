import React from "react";
import ProductCard from "./Product-card";
import "../../styles/Category/Product-list.css";

class ProductList extends React.Component {
    render() {
        return (
            <div className="product-list">
                {this.props.products.map(product => {

                    let filteredProduct = this.props.cart.find((selectProduct) => selectProduct.id == product.id) || product;

                    return (
                        <ProductCard
                            key={product.id}
                            product={filteredProduct}
                            onAddToCart={this.props.onAddToCart}
                        />
                    )
                })}
            </div>
        )
    }
}

export default ProductList;