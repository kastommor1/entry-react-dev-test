import React from "react";
import ProductCard from "./Product-card";
import "../../styles/product-card/Product-list.css";
import WarningMessage from "../Warning-message";

class ProductList extends React.Component {
    render() {
        if (this.props.products === 0) return <WarningMessage>No categories</WarningMessage>
        const sortedProducts = [...this.props.products].sort((a, b) => {
            if (!a.inStock > !b.inStock) return 1;
            if (!a.inStock < !b.inStock) return -1;
            return 0;
        });       

        return (
            <div className="product-list">
                {sortedProducts.map(product => {   

                    return (
                        <ProductCard
                            key={product.id}
                            cart={this.props.cart}
                            product={product}
                            onAddToCart={this.props.onAddToCart}
                            onDeleteFromCart={this.props.onDeleteFromCart}

                            currentCurrency={this.props.currentCurrency}
                            clearProduct={product}                            
                        />
                    )
                })}
                {this.props.products.length === 2 &&  <div></div>}
                {this.props.products.length === 1 &&  <><div></div><div></div></>}
            </div>
        )
    }
}

export default ProductList;