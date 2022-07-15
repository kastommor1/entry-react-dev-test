import React from "react";

//apollo, router
import { GET_PRODUCT } from "../apollo-client/queries";
import { widthProductQueryByParams } from "../service-functions/HOCs"

//component
import WarningMessage from "../components/Warning-message";
import Price from "../components/product-card/Price";
import Attributes from "../components/product-card/Attributes";
import AddButtonBig from "../components/product-card/Add-button-big";

//style
import '../styles/product-card/Product.css'
import GalleryWithIcons from "../components/product-card/Gallery-with-icons";
import Loading from "../components/Loading";


class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: null,
            error: false,
            loading: false
        };

    }

    getProductQuery() {
        const { query, cart, productId } = this.props;

        //-Get start product from Qery or Cart        
        if (!this.state.product) {
            //--Check product in cart            
            const cartProduct = cart.find(product => product.id === productId);

            //Get start product from Cart 
            if (cartProduct) {
                console.log('from cart');
                this.setState({ product: cartProduct })
            }
            //--Get start product from Qery            
            else {
                console.log('from query');
                const { loading, error, data } = query;

                if (loading) this.setState({ loading: true });
                if (error) this.setState({
                    loading: false,
                    error: error.message,
                });

                if (!data || !data.product) {
                    this.setState({
                        loading: false,
                        error: 'This product does not exist.',
                    });
                } else {
                    this.setState({
                        loading: false,
                        product: data.product
                    })
                }
            }
        }
    }

    // removePreviewProduct() {
    //     const id = this.props.productId;
    //     const cart = this.props.cart;
    //     const cartProduct = cart.find(product => product.id === id);
    //     const filteredCart = cart.filter((product) => product.id !== id);

    //     if (cartProduct && cartProduct.quantity === 0) {
    //         localStorage.setItem('cart', JSON.stringify(filteredCart));
    //         this.props.onDeleteFromCart(id);
    //     }
    // }

    setDescription() {        
        if (this.state.product) {
            let descriptionDOM = document.querySelector('.description');
            descriptionDOM.innerHTML = this.state.product.description;           
        }
    }

    componentDidMount() {
        // this.getProductQuery();

        // this.removePreviewProduct();
        // window.addEventListener("beforeunload", this.removePreviewProduct);//Don work 

        // this.setDescription(); //or use html-react-parser library

    }

    // componentWillUnmount() {
    //     window.removeEventListener("beforeunload", this.removePreviewProduct);
    //     this.removePreviewProduct();
    // }

    componentDidUpdate() {
        this.getProductQuery();
        this.setDescription(); //or use html-react-parser library
    }


    render() {    
        if (this.state.loading) return (<Loading />);
        if (this.state.error) {
            return (
                <WarningMessage>
                    <h2>Error.</h2>
                    <p>{this.state.error}</p>
                </WarningMessage>);
        }

        console.log(this.state.product);

        if (!this.state.product) return (<div></div>);

        const { id, name, inStock, gallery, prices, brand, quantity, attributes } = this.state.product;
        document.title = brand + ' ' + name;

        return (
            <div className="product">

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
                        <Price prices={prices} currentCurrency={this.props.currentCurrency} />

                        <AddButtonBig
                            inStock={inStock}
                            quantity={quantity}
                            product={this.state.product}
                            onAddToCart={this.props.onAddToCart}
                            onDeleteFromCart={this.props.onDeleteFromCart}
                        />

                        <div className="description"></div>
                    </div>
                </div>
            </div>
        )

    }
}




class Product1 extends React.Component {

    getProductQuery() {
        const { query, cart, productId } = this.props;
        const cartProduct = cart.find(product => product.id === productId);

        if (cartProduct) { return }//check product in cart     

        const { loading, error, data } = query;

        if (loading) return (<Loading />);
        if (error) return (<WarningMessage><p>Error. {error.message}</p></WarningMessage>);
        if (!data || !data.product) return (
            <WarningMessage>
                <h2>Sorry.</h2>
                <p>This product does not exist.</p>
            </WarningMessage>);

        const product = data.product;
        this.props.onAddToCart(product, true) //add widh 0 quantity                    
    }

    removePreviewProduct() {
        const id = this.props.productId;
        const cart = this.props.cart;
        const cartProduct = cart.find(product => product.id === id);
        const filteredCart = cart.filter((product) => product.id !== id);

        if (cartProduct && cartProduct.quantity === 0) {
            localStorage.setItem('cart', JSON.stringify(filteredCart));
            this.props.onDeleteFromCart(id);
        }
    }

    setDescription() {
        const { cart, productId } = this.props;
        const cartProduct = cart.find(product => product.id === productId);
        if (cartProduct) {
            let descriptionDOM = document.querySelector('.description');
            descriptionDOM.innerHTML = cartProduct.description;
        }
    }

    componentDidMount() {
        this.removePreviewProduct();
        window.addEventListener("beforeunload", this.removePreviewProduct);//Don work 

        this.setDescription(); //or use html-react-parser library
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.removePreviewProduct);
        this.removePreviewProduct();
    }

    componentDidUpdate() {
        this.getProductQuery();

        this.setDescription(); //or use html-react-parser library
    }


    render() {
        const { cart, productId } = this.props;
        const cartProduct = cart.find(product => product.id === productId);

        if (!cartProduct) { return (<div></div>) }

        const { id, name, inStock, gallery, prices, brand, quantity, attributes } = cartProduct;
        document.title = brand + ' ' + name;



        return (
            <div className="product">

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
                        <Price prices={prices} currentCurrency={this.props.currentCurrency} />

                        <AddButtonBig
                            inStock={inStock}
                            quantity={quantity}
                            product={cartProduct}
                            onAddToCart={this.props.onAddToCart}
                            onDeleteFromCart={this.props.onDeleteFromCart}
                        />

                        <div className="description"></div>

                    </div>
                </div>
            </div>
        )

    }
}

const ProductHOC = widthProductQueryByParams(Product, GET_PRODUCT, 'productId');

export default ProductHOC;