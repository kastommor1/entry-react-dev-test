import React from "react";
import { widthQueryByParams } from "../HOCs/HOCs";
import { GET_CATEGORY } from "../apollo-client/queries";
import WarningMessage from "../components/Warning-message";
import { element } from "prop-types";
import ProductCard from "../components/product-card/Product-card";

import '../styles/Caregory.css';
import ProductList from "../components/product-card/Product-list";


class Category extends React.Component {

    render() {
        if (this.props.categoriesName.filter(category => category.name == this.props.categoryName).length === 0) {
            return (
                <WarningMessage>
                    <p>Sorry. There is no such category.</p>
                </WarningMessage>)
        } else {
            document.title = this.props.categoryName.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
        }


        const { loading, error, data } = this.props.query;

        return (
            <div className="category">
                <h2>{this.props.categoryName.toLocaleUpperCase()}</h2>

                {loading && <p>Loading...</p>}
                {error && <WarningMessage><p>Error {error.message}</p></WarningMessage>}

                {data && data.category && data.category.products &&
                    <ProductList
                        products={data.category.products}
                        cart={this.props.cart}
                        onAddToCart={this.props.onAddToCart}
                    />
                }
            </div>
        )
    }
}

const CategoryHOC = widthQueryByParams(Category, GET_CATEGORY, 'categoryName');

export default CategoryHOC;