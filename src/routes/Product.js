import React from "react";

//apollo, router
import { GET_PRODUCT } from "../apollo-client/queries";
import { widthProductQueryByParams } from "../service-functions/HOCs"

//component
import WarningMessage from "../components/Warning-message";
import Price from "../components/product-card/Price";
import Attributes from "../components/product-card/Attributes";
import Gallery from "../components/product-card/Gallery";

//style
import '../styles/product-card/Product.css'

class Product extends React.Component {
    render() {
        const { productId, loading, error, data } = this.props;

        if (loading) return (<p>Loading...</p>);
        if (loading) return (<WarningMessage><p>Error {error.message}</p></WarningMessage>);
        if (!data || !data.product) return (
            <WarningMessage>
                <h2>Sorry.</h2>
                <p>This product does not exist.</p>
            </WarningMessage>);


        const product = data.product;
        const { id, name, inStock, gallery, prices, brand, quantity, attributes } = product;
        return (
            <div className="product">

                <Gallery gallery={gallery} name={name} />

                <div className="parameters">
                    <h3 className="brand" ><b>{brand}</b></h3>
                    <p className="name" >{name}</p>
                    <Attributes
                        productId={product.id}
                        attributes={attributes}
                        onAttributeChange={this.props.onAttributeChange}
                    />
                    <p className="price">Price:</p>
                    <Price prices={prices} />
                </div>


            </div>
        )

    }
}

const ProductHOC = widthProductQueryByParams(Product, GET_PRODUCT, 'productId');

export default ProductHOC;