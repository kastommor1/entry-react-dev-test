import React from "react";

//apollo, router
import { GET_PRODUCT } from "../apollo-client/queries";
import { widthProductQueryByParams } from "../service-functions/HOCs"

//component
import WarningMessage from "../components/Warning-message";
import Price from "../components/product-card/Price";
import Attributes from "../components/product-card/Attributes";
import Gallery from "../components/product-card/Gallery";
import AddButtonBig from "../components/product-card/Add-button-big";

//style
import '../styles/product-card/Product.css'
import GalleryWithIcons from "../components/product-card/Gallery-with-icons";


class Product extends React.Component {
    constructor(props) {
        super(props);
        this.removePreviewProduct = this.removePreviewProduct.bind(this);
    }

    removePreviewProduct() {
        const id = this.props.productId;
        const cart = this.props.cart;
        const cartProduct = cart.find(product => product.id === id);
        let filteredCart = cart.filter((product) => product.id != id);

        if (cartProduct && cartProduct.quantity === 0) {
            localStorage.setItem('cart', JSON.stringify(filteredCart));
        }
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.removePreviewProduct, false);
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.removePreviewProduct, false);
        this.removePreviewProduct();
    }

    render() {
        const { productId, loading, error, data, cart } = this.props;

        const cartProduct = cart.find(product => product.id === productId);

        if (!cartProduct) { //check product in cart
            if (loading) return (<p>Loading...</p>);
            if (error) return (<WarningMessage><p>Error {error.message}</p></WarningMessage>);
            if (!data || !data.product) return (
                <WarningMessage>
                    <h2>Sorry.</h2>
                    <p>This product does not exist.</p>
                </WarningMessage>);


            const product = data.product;
            this.props.onAddToCart(product, true) //add widh 0 quantity
            return (<div></div>)
        }

        const { id, name, inStock, gallery, prices, brand, quantity, attributes, description } = cartProduct;


        document.title = brand + ' ' + name;

        return (
            <div className="product">

                {/* <Gallery gallery={gallery} name={name} /> */}
                <GalleryWithIcons gallery={gallery} name={name} />

                <div className="wrapper">
                    <div className="parameters">

                        <h3 className="brand" ><b>{brand}</b></h3>
                        <p className="name" >{name}</p>

                        <Attributes
                            productId={id}
                            attributes={attributes}
                            onAttributeChange={this.props.onAttributeChange}
                        />

                        <p className="price-name">Price:</p>
                        <Price prices={prices} />                                                

                        <AddButtonBig
                            inStock={inStock}
                            quantity={quantity}
                            product={cartProduct}
                            onAddToCart={this.props.onAddToCart}
                        />

                        <div
                            dangerouslySetInnerHTML={{ __html: description }}
                            className="description"
                        />

                    </div>
                </div>
            </div>
        )

    }
}

const ProductHOC = widthProductQueryByParams(Product, GET_PRODUCT, 'productId');

export default ProductHOC;