import React from "react";
import ProductCard from "./Product-card";
import "../../styles/product-card/Product-list.css";
import WarningMessage from "../Warning-message";

class ProductList extends React.Component {
    render() {
        if (this.props.products === 0) return <WarningMessage>No categories</WarningMessage>

        return (
            <div className="product-list">
                {this.props.products.map(product => {

                    let filteredProduct = this.props.cart.find((selectProduct) => selectProduct.id === product.id) || product;

                    return (
                        <ProductCard
                            key={product.id}
                            product={filteredProduct}
                            onAddToCart={this.props.onAddToCart}
                            onDeleteFromCart={this.props.onDeleteFromCart}

                            currentCurrency={this.props.currentCurrency}
                            clearProduct={product}                            
                        />
                    )
                })}
                {this.props.products.length == 2 &&  <div></div>}
                {this.props.products.length == 1 &&  <><div></div><div></div></>}
            </div>
        )
    }
}

export default ProductList;